import FilterProduct from "../FilterProduct";

export const addTaxonomyTesting = () =>{
    test('works with one taxinomy', () => {
        const filterProduct = new FilterProduct();

        filterProduct.addItemInTaxinomieFilter('cat', '1')
        filterProduct.addItemInTaxinomieFilter('cat', '2')
        const taxonomy = filterProduct.getTaxonomiesList()

        expect(taxonomy).toMatchObject([
            {
                taxonomyKey: 'cat',
                valueList: ['1','2']
            }
        ])
    });
}

export const removeTaxonomyTesting = () => {
    test('Works with othe value in taxonomy', () => {
        const filterProduct = new FilterProduct();
        filterProduct.addItemInTaxinomieFilter('cat', '1')
        filterProduct.addItemInTaxinomieFilter('cat', '2')
        filterProduct.addItemInTaxinomieFilter('si', '2')

        filterProduct.removeItemInTaxinomieFilter('cat', '1')

        const taxonomy = filterProduct.getTaxonomiesList()
        expect(taxonomy).toMatchObject([
            {
                taxonomyKey: 'cat',
                valueList: ['2']
            },
            {
                taxonomyKey: 'si',
                valueList: ['2']
            }
        ])


    })

    test('Works with just that value in taxonomy', () => {
        const filterProduct = new FilterProduct();
        filterProduct.addItemInTaxinomieFilter('cat', '1')
        filterProduct.removeItemInTaxinomieFilter('cat', '1')

        const taxonomy = filterProduct.getTaxonomiesList()
        expect(taxonomy).toMatchObject([])


    })
}

export const getQueryStringTest = () => {
    test('work with all filter set', () => {

        const filterProduct = new FilterProduct();
        filterProduct.addItemInTaxinomieFilter('cat', '1')
        filterProduct.addItemInTaxinomieFilter('si', '2')
        filterProduct.addItemInTaxinomieFilter('si', '3')
        filterProduct.setSortFilter('price', false)
        filterProduct.setLimit(5)
        filterProduct.setPage(2)
        expect(filterProduct.getQueryString()).toEqual("?taxinomy=cat=1!si=2,3&sort=-price&limit=5&page=2")
    })
}

export const isIncludeValueInTaxonomyTest = () => {
    test('Works with the value in', () => {
        const filterProduct = new FilterProduct();
        filterProduct.addItemInTaxinomieFilter('cat', '1')
        filterProduct.addItemInTaxinomieFilter('si', '2')
        filterProduct.addItemInTaxinomieFilter('si', '3')

        expect(filterProduct.isValueIncludeInTaxonomy('cat', '1')).toBe(true)
    })

    test('Works with the value not in', () => {
        const filterProduct = new FilterProduct();
        filterProduct.addItemInTaxinomieFilter('cat', '1')
        filterProduct.addItemInTaxinomieFilter('si', '2')
        filterProduct.addItemInTaxinomieFilter('si', '3')

        expect(filterProduct.isValueIncludeInTaxonomy('cat', '8')).toBe(false)
        expect(filterProduct.isValueIncludeInTaxonomy('cato', '1')).toBe(false)
    })
}