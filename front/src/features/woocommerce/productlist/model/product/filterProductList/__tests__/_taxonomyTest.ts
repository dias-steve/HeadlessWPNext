
import Taxonomy from "../Taxonomy";

export const TaxonomyGetQueryTesting = () => {
    
    test('Work with taxonomy in', () => {
        const taxonomy = new Taxonomy('cat', ['1','2']);
        const query = taxonomy.getQueryString();

        expect(query).toBe('cat=1,2')

    });

    test('Work with taxonomy not in', () => {
        const taxonomy = new Taxonomy('cat', []);
        const query = taxonomy.getQueryString();

        expect(query).toBe("")

    });
}

export const removeValueTesting = () => {

    test('Works with other taxonomy else in', () => {
        const taxonomy : Taxonomy = new Taxonomy('cat', ['1','2']);
        taxonomy.removeValue('cat', '1');

        expect(taxonomy).toMatchObject({
            valueList : ['2']
        })
    });

    test('Works with just that taxonomy in', () => {
        const taxonomy : Taxonomy = new Taxonomy('cat', ['1']);
        taxonomy.removeValue('cat', '1');
        expect(taxonomy).toMatchObject({
            valueList : []
        })
    });
}

