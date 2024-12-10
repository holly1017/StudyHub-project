import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import CustomAvatar from "../../../Common/Component/etc/CustomAvatar";
import { useUser } from "../../../Common/UserContext";

interface ProfileArea{
    writer: string;
    profile: string;
}

const ProfileArea:React.FC<ProfileArea> = ({writer, profile}) => {

    const {user} = useUser();

    return(
        <CustomDivStyle width="50%" display="flex" marginRight="50%">
            <CustomAvatar image={profile} width={30} height={30}></CustomAvatar>
            <CustomDivStyle alignSelf="center" marginLeft={'3px'} fontSize={15} fontWeight={700}>{writer}</CustomDivStyle>
        </CustomDivStyle>
    )
}

export default ProfileArea;