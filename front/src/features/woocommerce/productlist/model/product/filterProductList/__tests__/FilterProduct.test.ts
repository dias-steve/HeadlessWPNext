import { addTaxonomyTesting, getQueryStringTest, isIncludeValueInTaxonomyTest, removeTaxonomyTesting } from "./_FilterProductTest";
import { TaxonomyGetQueryTesting, removeValueTesting } from "./_taxonomyTest";

describe("Filter Product ", () => {
    describe("Taxonomy Tests", () => {
        describe("Get Query", () => {
            TaxonomyGetQueryTesting();
        });

        describe("Remove Value", () =>{
            removeValueTesting();
        })
    })

    describe('AddTaxonomy in Filter', () => {
        addTaxonomyTesting()
    })

    describe('RemoveTaxonomy in Filter', () => {
        removeTaxonomyTesting()
    })

    describe('Get Query from filter', () => {
        getQueryStringTest();
    })

    describe('Is include Taxonomy in Filter', () => {
        isIncludeValueInTaxonomyTest();
    })
});

