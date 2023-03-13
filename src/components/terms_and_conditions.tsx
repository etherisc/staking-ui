import { Link } from "@mui/material";
import { Trans, useTranslation } from "next-i18next";

export default function TermsAndConditions(props: any) {
    const { textKey, url } = props;
    const { t } = useTranslation('common');
    const terms_and_conditions_url = props.url || process.env.NEXT_PUBLIC_TERMS_AND_CONDITONS_URL || "https://www.etherisc.com/staking-terms-and-conditions";
    const i18nKey = textKey || 'terms_and_conditions';

    return (
        <Trans i18nKey={i18nKey} t={t} >
            <Link target="_blank" href={terms_and_conditions_url} className="no_decoration">{i18nKey}</Link>
        </Trans> 
    );
}