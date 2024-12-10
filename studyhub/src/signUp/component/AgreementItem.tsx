import React from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import ParagraphStyle from "../../Common/Component/etc/ParagraphStyle";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel } from "@mui/material";
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';

interface AgreementItemProps {
    title: string;
    content?: React.JSX.Element;
    checked: boolean; 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    name: string; 
}

const AgreementItem: React.FC<AgreementItemProps> = ({ title, content, checked, onChange, name }) => {
    return (
        <CustomDivStyle marginTop={50} marginBottom={30}>
            <Accordion style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreSharpIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <ParagraphStyle color="#737373" margin={0}>
                        [필수] {title}
                    </ParagraphStyle>
                </AccordionSummary>
                <AccordionDetails>
                    <CustomDivStyle wordBreak="break-all">
                        {content}
                    </CustomDivStyle>
                </AccordionDetails>
            </Accordion>
            <CustomDivStyle marginTop={15}>
                <CustomDivStyle height={48} display="flex" justifyContent="space-between" alignItems="center" borderRadius={10} backgroundColor="#D9D9D9">
                    <ParagraphStyle margin={"0px 0px 0px 20px"} color="#737373">{title}에 대한 안내 사항을 읽고 동의합니다.</ParagraphStyle>
                    <FormControlLabel
                        control={<Checkbox checked={checked} onChange={onChange} name={name} />} 
                        label="동의"
                    />
                </CustomDivStyle>
            </CustomDivStyle>
        </CustomDivStyle>
    );
};

export default AgreementItem;
