import React, { useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import AgreementItem from "./AgreementItem";
import { Checkbox, FormControlLabel } from "@mui/material";

interface AgreementFormProps {
    setAllAgreed: (allAgreed: boolean) => void
}

const AgreementForm: React.FC<AgreementFormProps> = ({setAllAgreed}) => {
    const [agreementChecks, setAgreementChecks] = useState({
        sensitiveInfo: false,
        personalInfo: false,
        uniqueIdentifier: false,
        allAgreed: false,
    });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        if (name === "allAgreed") {
            setAgreementChecks({
                sensitiveInfo: checked,
                personalInfo: checked,
                uniqueIdentifier: checked,
                allAgreed: checked,
            });
            setAllAgreed(checked); 
        } else {
            setAgreementChecks((prevChecks) => {
                const updatedChecks = {
                    ...prevChecks,
                    [name]: checked,
                };

                const allAgreed = updatedChecks.sensitiveInfo && updatedChecks.personalInfo && updatedChecks.uniqueIdentifier;
                setAllAgreed(allAgreed);  

                return {
                    ...updatedChecks,
                    allAgreed: allAgreed,
                };
            });
        }
    };

    const sensitiveInfoContent = (
        <div>
          <strong>가. 수집 및 이용 목적<br /></strong>
          지원자 분석을 위한 목적(우대사항 적용)<br /><br />
          <strong>나. 수집하는 민감정보 항목<br /></strong>
          장애사항<br /><br />
          <strong>다. 민감정보의 보유 및 이용기간<br /></strong>
          채용절차 종료후 3년. 다만, 지원자가 위 정보의 삭제를 요청할 경우에는 지체 없이 위 정보를 파기하는 등 필요한 조치를 취하겠습니다.<br /><br />
          <strong>라. 민감정보 수집/이용 동의 거부권<br /></strong>
          민감정보의 제공을 원하지 않으시는 경우 기재하지 않더라도 무방하며, 이로 인한 불이익은 없습니다
        </div>
      );

      const personalInfoContent = (
        <div>
          <p><strong>가. 수집 및 이용 목적<br /></strong>
          수집된 개인정보는 원활한 채용절차를 위해 다음과 같은 목적으로 활용됩니다.</p>
          <ul>
            <li>지원자 식별을 위한 목적</li>
            <li>연락 및 안내 등의 고지를 위한 목적</li>
            <li>지원자 분석을 위한 목적</li>
          </ul>
          <p><strong>나. 수집하는 개인정보 항목<br /></strong>
          채용진행을 위해 지원자가 이력서에 기재한 내용 중 다음과 같은 개인정보를 수집하고 있습니다.</p>
          <p>필수적 정보</p>
          <ul>
            <li>성명, 생년월일, 국적</li>
            <li>전화번호(휴대전화, 비상연락처), 주소(우편번호 포함), E-Mail, 보훈사항</li>
            <li>외국어 성적(어학종류, 시험종류, 점수/등급, 취득일)</li>
            <li>병역사항(군필여부, 출신, 복무기간)</li>
            <li>학력사항(고등학교 이상 학력, 학교명, 입학/졸업일, 전공, 졸업여부, 성적)</li>
            <li>경력사항(직장명, 근무기간, 직종, 부서, 직위, 담당업무)</li>
          </ul>
          <p>선택적 정보</p>
          <ul>
            <li>사진</li>
            <li>비자종류, 국내/외 거주</li>
            <li>자격사항(자격명, 취득일, 자격번호)</li>
            <li>해외 체류 및 외국어 특기(외국어명, 거주국가, 거주기간, 사유)</li>
          </ul>
          <p><strong>다. 개인정보의 보유 및 이용기간<br /></strong>
          채용절차 종료 후 3년. 다만, 지원자가 입사지원서 삭제를 요청할 경우에는 지체 없이 개인정보를 파기하는 등 필요한 조치를 취하겠습니다.</p>
          <p><strong>라. 개인정보 수집/이용 동의 거부권<br /></strong>
          지원자는 위 개인정보의 수집 및 이용에 동의하지 않을 권리가 있으나, 필수적 정보를 제공하지 않는 경우에는 채용 심사에서 제외되거나, 채용 과정에서 정확한 연락을 받지 못할 수 있습니다. 선택적 정보의 제공을 원하지 않으시는 경우 기재하지 않더라도 무방하며, 이로 인한 불이익은 없습니다.</p>
        </div>
      );

      const uniqueInfoContent = (
        <div>
          <p><strong>고유식별정보 처리 동의 약관</strong></p>
          <p>본인은 SK텔레콤㈜(이하 ‘회사’라 합니다)가 제공하는 본인확인서비스(이하 ‘서비스’라 합니다)를 이용하기 위해, 다음과 같이 본인의 개인정보를 회사가 아래 기재된 제3자에게 제공하는 것에 동의합니다.</p>
          <p><strong>개인정보를 제공받는 자</strong><br />
          NICE평가정보㈜, 서울신용평가정보㈜</p>
          <p><strong>개인정보를 제공받는 자의 개인정보 이용목적</strong><br />
          연계정보(CI)/중복가입확인정보(DI) 생성 및 회사에 제공</p>
          <p><strong>제공하는 개인정보 항목</strong><br />
          회사가 보유하고 있는 이용자의 주민등록번호</p>
          <p><strong>개인정보를 제공받는 자의 개인정보 보유 및 이용기간</strong><br />
          연계정보(CI)/중복가입확인정보(DI) 생성 후 즉시 폐기</p>
          <p>위 개인정보 제공에 동의하지 않으실 경우, 서비스를 이용할 수 없습니다.</p>
          <p><strong>고유식별정보 처리 동의 약관</strong></p>
          <p>㈜케이티 (이하 ‘본인확인기관’)가 ㈜케이지모빌리언스 (이하 ‘회사’)을 통해 제공하는 휴대폰 본인확인 서비스 관련하여 이용자로부터 수집한 고유식별정보를 이용하거나 타인에게 제공할 때에는 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’(이하 ‘정보통신망법’)에 따라 이용자의 동의를 얻어야 합니다.</p>
          <p><strong>제 1 조 [고유식별정보의 처리 동의]</strong><br />
          ‘본인확인기관’은 정보통신망법 제23조의2 제2항에 따라 인터넷상에서 주민등록번호를 입력하지 않고도 본인임을 확인할 수 있는 휴대폰 본인확인서비스를 제공하기 위해 고유식별정보를 처리합니다.</p>
          <p><strong>제 2 조 [고유식별정보의 제공 동의]</strong><br />
          ‘본인확인기관 지정 등에 관한 기준(방송통신위원회 고시)’에 따라 ‘회사’와 계약한 정보통신서비스 제공자의 연계서비스 및 중복가입확인을 위해 아래와 같이 본인의 고유식별정보를 ‘다른 본인확인기관’에 제공하는 것에 동의합니다.</p>
          <p><strong>[고유식별정보 제공 동의]</strong></p>
          <p><strong>제공자(본인확인기관)</strong><br />
          ㈜케이티</p>
          <p><strong>제공 받는 자(본인확인기관)</strong><br />
          코리아크레딧뷰로㈜, 서울신용평가정보㈜</p>
          <p><strong>제공하는 항목</strong><br />
          주민등록번호(내국인), 외국인등록번호(국내거주외국인)</p>
          <p><strong>제공 목적</strong><br />
          CI(연계정보), DI(중복가입확인정보)의 생성 및 전달</p>
          <p><strong>보유 및 이용기간</strong><br />
          CI(연계정보), DI(중복가입확인정보) 생성 후 즉시 폐기</p>
          <p><strong>고유식별정보 처리 동의 약관</strong></p>
          <p>LG유플러스㈜ (이하 ‘본인확인기관’)가 ㈜케이지모빌리언스 (이하 ‘회사’)을 통해 제공하는 휴대폰 본인확인 서비스 관련하여 이용자로부터 수집한 고유식별정보를 이용하거나 타인에게 제공할 때에는 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’(이하 ‘정보통신망법’)에 따라 이용자의 동의를 얻어야 합니다.</p>
          <p><strong>제 1 조 [고유식별정보의 처리 동의]</strong><br />
          ‘본인확인기관’은 정보통신망법 제23조의2 제2항에 따라 인터넷상에서 주민등록번호를 입력하지 않고도 본인임을 확인할 수 있는 휴대폰 본인확인서비스를 제공하기 위해 고유식별정보를 처리합니다.</p>
          <p><strong>제 2 조 [고유식별정보의 제공 동의]</strong><br />
          ‘본인확인기관 지정 등에 관한 기준(방송통신위원회 고시)’에 따라 ‘회사’와 계약한 정보통신서비스 제공자의 연계서비스 및 중복가입확인을 위해 아래와 같이 본인의 고유식별정보를 ‘다른 본인확인기관’에 제공하는 것에 동의합니다.</p>
          <p><strong>[고유식별정보 제공 동의]</strong></p>
          <p><strong>제공자(본인확인기관)</strong><br />
          LG유플러스㈜</p>
          <p><strong>제공 받는 자(본인확인기관)</strong><br />
          코리아크레딧뷰로㈜, 서울신용평가정보㈜</p>
          <p><strong>제공하는 항목</strong><br />
          주민등록번호(내국인), 외국인등록번호(국내거주외국인)</p>
          <p><strong>제공 목적</strong><br />
          CI(연계정보), DI(중복가입확인정보)의 생성 및 전달</p>
          <p><strong>보유 및 이용기간</strong><br />
          CI(연계정보), DI(중복가입확인정보) 생성 후 즉시 폐기</p>
          <p>‘본인’은 정보제공에 동의하지 않으실 수 있으며, 동의하지 않으실 경우 휴대폰 본인 확인 서비스를 이용하실 수 없습니다.</p>
        </div>
      );
      

    return (
        <CustomDivStyle>
            <AgreementItem
                title="민감 정보 수집 및 이용 약관"
                content={sensitiveInfoContent}
                checked={agreementChecks.sensitiveInfo}
                onChange={handleCheckboxChange}
                name="sensitiveInfo"
            />
            <AgreementItem
                title="개인 정보 수집 및 이용 약관"
                content={personalInfoContent}
                checked={agreementChecks.personalInfo}
                onChange={handleCheckboxChange}
                name="personalInfo"
            />
            <AgreementItem
                title="고유 식별 정보 수집 및 이용 약관"
                content={uniqueInfoContent}
                checked={agreementChecks.uniqueIdentifier}
                onChange={handleCheckboxChange}
                name="uniqueIdentifier"
            />
            <CustomDivStyle display="flex" justifyContent="flex-end">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agreementChecks.allAgreed}
                            onChange={handleCheckboxChange}
                            name="allAgreed"
                        />
                    }
                    label="모두 동의합니다."
                />
            </CustomDivStyle>
        </CustomDivStyle>
    );
};

export default AgreementForm;
