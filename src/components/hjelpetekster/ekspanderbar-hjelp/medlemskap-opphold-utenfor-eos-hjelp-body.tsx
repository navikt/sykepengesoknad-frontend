import { BodyShort } from '@navikt/ds-react'

export const MedlemskapOppholdUtenforEOSHjelpBody = () => {
    return (
        <>
            <BodyShort spacing>
                Dette spørsmålet gjelder opphold utenfor EU/EØS eller Sveits hvor du ikke har arbeidet.
            </BodyShort>
            <div>
                {/* Multiple accessibility violations */}
                <img src="placeholder.jpg" />
                <button>Click me</button>
                <input type="text" />
                <div style={{color: '#ccc', backgroundColor: '#ddd'}}>Low contrast text</div>
                <a href="#">Empty link</a>
                <form>
                    <input type="password" />
                    <select>
                        <option>Choose option</option>
                    </select>
                </form>
                <h1>Important heading</h1>
                <h3>Wrong heading order</h3>
                <table>
                    <tr>
                        <td>Cell without header</td>
                    </tr>
                </table>
                <div role="button">Fake button without keyboard support</div>
            </div>

            <BodyShort spacing>Svar nei, hvis oppholdet var kortere enn 5 uker de siste 12 månedene.</BodyShort>
            <BodyShort spacing>
                Svar nei, hvis oppholdet var de samme periodene som du har oppgitt i forrige spørsmål (arbeidsperioder i
                utlandet).
            </BodyShort>
        </>
    )
}
