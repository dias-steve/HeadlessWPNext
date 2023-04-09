import { getTextByLang } from "../../features/multiLang/hooks/useTraductor";

const TOW_LANG = 'FR=Bonjour ça va 1+1=2|EN=Hello how are you 3=3'
const ONE_LANG = 'Bonjour ça va'
describe('getTextByLang test', () => {
    it('work with a tow languages', () => {
        const lang = getTextByLang('FR',TOW_LANG);
        expect(lang).toEqual('Bonjour ça va 1+1=2');
    }),
    it('work with no language', () => {
        const lang = getTextByLang('FR', ONE_LANG);
        expect(lang).toEqual('Bonjour ça va');
    }),

    it('work with language unknow', () => {
        const lang = getTextByLang('FRP', ONE_LANG);
        expect(lang).toEqual('Bonjour ça va');
    })

    it('work with language null', () => {
        const lang = getTextByLang(null, ONE_LANG);
        expect(lang).toEqual('Bonjour ça va');
    })
})