/* eslint-disable no-undef */

export const lyttTilNettverksKall = (a: any) => {
    const spy = a ? a['getCalls']() : [];
    for(const call of spy) {
        const { args } = call;
        const url = args[0];
        const req = args[1];
        cy.log('ARGS', [ url, req ]);

        //expect(req).to.deep.equal('json');
    }
};
