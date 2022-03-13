import { jest, expect, test, describe, } from '@jest/globals';

import superTest from 'supertest';

import Server from '../../src/server.js';

describe( 'API E2E Test Suite', () => {
    beforeEach( async () => {
        // deletes all data
        const response = await superTest( Server )
            .delete( '/' );
    });

    // because of beforeEach, this test will not interfere with the other tests
    test( 'POST / - should save item in array and return it with id', async () => {
        const response = await superTest( Server )
            .post( '/' )
            .send( {
                name: 'fernando',
                age: 32
            } );

        const data = JSON.parse( response.text );
        expect( data.id ).toBeDefined();
        expect( data.name ).toBeDefined();
        expect( data.age ).toBeDefined();
        expect( response.status ).toBe( 200 );
     } );


    test( 'GET / - should return array', async () => {
        const response = await superTest( Server )
            .get( '/' );

        const data = JSON.parse( response.text );

        console.log( data );

        expect( data ).toBeInstanceOf( Array );
        expect( data.length ).toBe( 0 );
        expect( response.status ).toBe( 200 );
    } );

    test.todo( 'DELETE / - should delete array and return ok' );
} );