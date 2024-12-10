import React from "react";
import CustomDivStyle from "../../Component/etc/CustomDivStyle";

interface UpdateDeleteGroup {
    modifyMethod: () => any,
    deleteMethod: () => any,
    modifyOption?: boolean
}

const UpdateDeleteGroup: React.FC<UpdateDeleteGroup> = ({modifyMethod, deleteMethod, modifyOption=true}) => {
    return (
        <CustomDivStyle display="flex" gap={5}>
              {modifyOption && <CustomDivStyle cursor="pointer" onClick={modifyMethod}>수정</CustomDivStyle>}
              <CustomDivStyle cursor="pointer" onClick={deleteMethod}>삭제</CustomDivStyle>
        </CustomDivStyle>
    )
}

export default UpdateDeleteGroup;