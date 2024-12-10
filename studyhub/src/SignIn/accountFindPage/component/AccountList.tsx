import React from "react"; 
import CustomButton from "../../../Common/Component/button/CustomButton";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import ParagraphStyle from "../../../Common/Component/etc/ParagraphStyle";
import { PercentTd } from "./AccountListStyle";
import { Link } from "react-router-dom";
import CustomLinkStyle from "../../../Common/Component/button/CustomLinkStyle";

interface Account {
    nickName: string;
    memberId: string
}

interface AccountListProps {
    accountList: Account[];
}

const AccountList: React.FC<AccountListProps> = ({accountList}) => {
    
    return (
        <table width={"100%"}>
            <tbody>
            <CustomDivStyle width={"100%"} height={200} display="flex">
                <CustomDivStyle overflow="auto" width={"100%"}>
                {
                    accountList.map((account, index)=>{
                        return (
                            <tr key={index}>
                                <PercentTd width="10%">
                                    <ParagraphStyle fontSize={18} fontWeight={900}>
                                        {index+1}
                                    </ParagraphStyle>
                                </PercentTd>
                                <PercentTd width="25%">
                                    <ParagraphStyle fontSize={18} fontWeight={900}>
                                    {account.memberId}
                                    </ParagraphStyle>
                                </PercentTd>
                                <PercentTd width="20%">
                                    <ParagraphStyle fontSize={18} fontWeight={900}>
                                    {account.nickName}
                                    </ParagraphStyle>
                                </PercentTd>
                        </tr>
                        )
                    })
                }
                </CustomDivStyle>
            </CustomDivStyle>
            <tr>
                <td colSpan={3}>
                    <CustomDivStyle marginTop={20}>
                        <CustomLinkStyle to={'/'}><CustomButton width="100%" height={49} content="확인" backgroundColor="black" textColor="white" fontSize={18} fontWeight={500} borderColor="" borderRadius={15} borderStyle="" borderWidth={0}></CustomButton></CustomLinkStyle>
                    </CustomDivStyle>
                </td>
            </tr>
            </tbody>
        </table>
    )
}

export default AccountList;