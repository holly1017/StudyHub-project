import { styled } from "@mui/material";

const SoldCover = styled('button')(
    () => ({
        position: 'absolute',
        top: 30,
        left: 1,
        width: '180px',
        height: '120px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        zIndex: 1,
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        border: 'none', // 기본 버튼 테두리 제거
        cursor: 'pointer', // 클릭 커서 표시
    })
)

export default SoldCover;