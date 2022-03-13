import { createServer } from 'http';
import { once } from 'events';
import { randomUUID } from 'crypto';

const Database = new Map();

function respondJSON( data, response ) {
    return response.end( JSON.stringify( data ) );
}

async function handler( request, response ) {
    const { method } = request;

    if( method === 'GET' ) {
        return respondJSON( [ ...Database.values() ], response );
    }

    if( method === 'POST' ) {
        const body = await once( request, 'data' );
        let data = JSON.parse( body );
        console.log( 'received', data );

        const id = randomUUID();
        data = { ...data, id };
        Database.set( id, data );

        return respondJSON( data, response );
    }

    if( method === 'DELETE' ) {
        Database.clear();
        return respondJSON( { ok: 1 }, response );
    }

    //response.end( 'hello world' );
}

export default createServer( handler );