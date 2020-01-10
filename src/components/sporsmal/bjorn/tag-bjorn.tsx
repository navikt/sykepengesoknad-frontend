import React from 'react';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { TagTyper } from '../../../types/enums';
import Bjorn from './bjorn';
import { fjernIndexFraTag } from '../sporsmal-utils';
import { useAppStore } from '../../../data/stores/app-store';
import Vis from '../../../utils/vis';
import { Sporsmal } from '../../../types/types';

const tagsMedBjorn = {
    soknadstype: RSSoknadstype.ARBEIDSTAKERE,
    tagtyper: [ TagTyper.JOBBET_DU_GRADERT, TagTyper.JOBBET_DU_100_PROSENT ],
};

interface TagBjornProps {
    sporsmal: Sporsmal;
    className?: string;
}

const TagBjorn = ({ sporsmal, className }: TagBjornProps) => {
    const { valgtSoknad } = useAppStore();
    const tag = sporsmal.tag;

    const harBjorntekst = (tag: TagTyper) => {
        return tagsMedBjorn.soknadstype === valgtSoknad.soknadstype && tagsMedBjorn.tagtyper.includes(tag);
    };

    return (
        <Vis hvis={harBjorntekst(tag)}>
            <Bjorn className={className} nokkel={`soknad.bjorn.${fjernIndexFraTag(tag).toLowerCase()}`} />
        </Vis>
    )
};

export default TagBjorn;
