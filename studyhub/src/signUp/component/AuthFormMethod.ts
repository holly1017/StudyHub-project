import { getData } from "../../Api";

export const emailCheck = (email: string, setEmailError: (message: string) => void, setEmailAuthComplete:(message: string)=>void) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        setEmailAuthComplete("");
        setEmailError("이메일 형식이 아닙니다.");
    } else {
        setEmailError(""); 
    }
}

export const phoneCheck = (phone: string, setPhoneError: (message: string) => void, setPhoneAuthComplete:(message: string)=>void) => {
    const phoneRegex = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(phone)) {
        setPhoneAuthComplete("");
        setPhoneError("전화번호 형식이 아닙니다.");
    } else {
        setPhoneError(""); 
    }
}

export const sendAuthEmail = async(email: string, setSendBtn: (message: string) => void, setEmailTimeLeft: (message: number) => void, setEmailAuthComplete: (message: string)=>void, setEmailError:(message: string)=>void) => {
    try {
        const response = await getData(`/member/signup/auth-email?email=${email}`); 
        if(response) {
            setEmailAuthComplete("이메일 인증 번호 전송 완료")
            setSendBtn("재전송");
            setEmailTimeLeft(180);
        } else {
            setEmailError("이메일 인증 번호 전송 실패")
        }
    } catch (error) {
        console.error('GET 요청 실패:', error);
    }

}

export const checkAuthEmail = async(email: string, authEmail: string, setEmailAuthCorrect: (message: string) => void, setEmailAuthError: (message: string) => void) => {
    try {
        const response = await getData(`/member/signup/check-auth-email?email=${email}&authEmail=${authEmail}`); 
        if(response) {
            setEmailAuthError("");
            setEmailAuthCorrect("인증 번호가 일치합니다.");
        } else {
            setEmailAuthCorrect("");
            setEmailAuthError("인증 번호가 일치하지 않습니다.");
        }
    } catch (error) {
        console.error('GET 요청 실패:', error);
    }
}

export const sendAuthPhone = async(phone: string, setSendBtn: (message: string) => void, setPhoneAuthComplete:(message: string)=>void, setPhoneError: (message: string)=>void) => {
    try {
        const response = await getData(`/member/signup/auth-phone?phone=${phone}`); 
        if(response) {
            setPhoneAuthComplete("전화번호 인증 번호 전송 완료")
            setSendBtn("재전송");
        } else {
            setPhoneError("전화번호 인증 번호 전송 실패")
        }
    } catch (error) {
        console.error('GET 요청 실패:', error);
    }

}

export const checkAuthPhone = async(phone: string, authPhone: string, setPhoneAuthCorrect: (message: string) => void, setPhoneAuthError: (message: string) => void) => {
    try {
        const response = await getData(`/member/signup/check-auth-phone?phone=${phone}&authPhone=${authPhone}`); 
        if(response) {
            setPhoneAuthError("");
            setPhoneAuthCorrect("인증 번호가 일치합니다.");
        } else {
            setPhoneAuthCorrect("");
            setPhoneAuthError("인증 번호가 일치하지 않습니다.");
        }
    } catch (error) {
        console.error('GET 요청 실패:', error);
    }
}