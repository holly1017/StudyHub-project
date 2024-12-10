import { getData } from "../../Api";

export const idRegex = (id: string, setIdError: (message: string) => void, setIdAvailable: (message: string) => void) => {
    const idRegex = /^[A-Za-z\d]{3,14}$/;
    if (!idRegex.test(id)) {
        setIdAvailable("");
        setIdError("아이디는 4자 이상 15자 이하의 영문 대소문자와 숫자로만 구성되어야 합니다.");
    } else {
        setIdError(""); 
    }
}

export const pwRegex = (pw: string, setPwError: (message: string) => void) => {
    const pwRegex = /^.{7,14}$/;
    if (!pwRegex.test(pw)) {
        setPwError("비밀번호는 8자 이상 15자 이하이어야 합니다.");
    } else {
        setPwError(""); 
    }
}

export const pwConfirm = (pw: string, pwCheck: string, setPwCheckError: (message: string) => void) => {
    if (pw !== pwCheck) {
        setPwCheckError("비밀번호가 일치하지 않습니다.");
    } else {
        setPwCheckError(""); 
    }
}

export const nickNameRegex = (nickName: string, setNickNameError: (message: string) => void, setNickNameAvailable: (message: string)=> void) => {
    const nickNameRegex = /^[a-zA-Z0-9가-힣ㄱ-ㅎ]{2,8}$/;
    if (!nickNameRegex.test(nickName)) {
        setNickNameAvailable("");
        setNickNameError("닉네임은 특수문자를 제외한 2자 이상 8자 이하의 영문, 숫자, 한글로 구성되어야 합니다.");
    } else {
        setNickNameError(""); 
    }
}

export const chipDataCheck = (chipData: string, setChipDataError: (message: string) => void) => {
    const chipDataRegex = /^[a-zA-Z0-9가-힣ㄱ-ㅎ]{2,25}$/;
    if (!chipDataRegex.test(chipData)) {
        setChipDataError("해시태그는 특수문자를 입력할 수 없습니다.");
    } else {
        setChipDataError("");
    }
}

export const idCheck = async (id: string, setIdAvailable: (message: string) => void, setIdError: (message: string) => void) => {
    try {
        const response = await getData(`/member/signup/id-check?id=${id}`); 
        if (response) {
            setIdError(""); 
            setIdAvailable("아이디 사용 가능");
        } else {
            setIdAvailable(""); 
            setIdError("아이디 사용 불가능");
        }
    } catch (error) {
        console.error('GET 요청 실패:', error);
    }
}


export const nickNameCheck = async (nickName: string, setNickNameAvailable: (message: string)=> void, setNickNameError:(message: string)=> void) => {
    try {
        const response = await getData(`/member/signup/nickname-check?nickName=${nickName}`); 
        if(response) {
            setNickNameError("");
            setNickNameAvailable("닉네임 사용 가능")
        } else {
            setNickNameAvailable("");
            setNickNameError("닉네임 사용 불가능")
        }
    } catch (error) {
        console.error('GET 요청 실패:', error);
    }
}
