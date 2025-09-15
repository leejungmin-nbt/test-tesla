"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adRequestCreateFormSchema,
  AdRequestCreateFormType,
  AdRequestStep1CampaignInfoType,
  AdRequestStep2AdInfoType,
} from "@/schema/adRequestCreate.schema";
import StepProgress from "./_components/StepProgress";
import CampaignForm from "./_components/CampaignForm";
import AdForm from "./_components/AdForm";
import PreviewPanel from "./_components/PreviewPanel";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/common/Modal";
import {
  saveFormData,
  loadFormData,
  clearFormData,
} from "@/utils/localStorage";
import ConfirmRegistrationModal from "./_components/ConfirmRegistrationModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateAdRequestPage = () => {
  const [step, setStep] = useState(1);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [savedFormData, setSavedFormData] =
    useState<AdRequestCreateFormType | null>(null);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { isDirty },
  } = useForm<AdRequestCreateFormType>({
    mode: "onChange",
    resolver: zodResolver(adRequestCreateFormSchema),
    defaultValues: {
      //step1
      title: "",
      advertiserId: "",
      brand: "",
      adVendor: "",
      categoryId: "",
      advertiserIntegrationId: "",
      reportType: "",
      repeatParticipateTypeId: "",
      helpRequestPersonalInfoTypeIds: [],
      advertiserCsManagerNames: "",
      advertiserCsManagerEmails: "",
      //step2
      targetCookieovenPublisherIds: [],
      adActionTypeId: "",
      targetOs: [],
      adTypeId: "",
      startAt: "",
      endAt: "",
      targetTimes: { from: "", to: "" },
      landingUrl: { default: "", android: "", ios: "" },
      viewAssets: {
        thumbnailFeed: "",
        thumbnailIcon: "",
        title: "",
        subtitle: "",
        detailImage: "",
        navigationTitle: "",
        detailTitle: "",
        detailSubtitle: "",
        callToAction: "",
        notice: "",
      },
      adSettleTypeId: "",
      cost: "",
      minPaymentAmount: "",
      budget: "",
      dailyActionCap: "",
      delayTerm: "",
      participateExpiredAt: "1",
      targetGenders: [],
      targetAges: { from: "", to: "" },
      targetAdisonPublisherIds: { mode: [], publisherIds: [] },
    },
  });

  const watchedData = watch();

  const restoreFormData = () => {
    if (savedFormData) {
      // 폼 데이터 복원
      Object.entries(savedFormData).forEach(([key, value]) => {
        setValue(key as keyof AdRequestCreateFormType, value, {
          shouldDirty: true,
        });
      });
      clearFormData();
      setSavedFormData(null);
    }
    setShowRestoreModal(false);
  };

  const discardFormData = () => {
    clearFormData();
    setSavedFormData(null);
    setShowRestoreModal(false);
  };

  // 스탭별 유효성 검사 함수
  const validateCurrentStep = async (currentStep: number): Promise<boolean> => {
    if (currentStep === 1) {
      const step1Fields: (keyof AdRequestStep1CampaignInfoType)[] = [
        "title",
        "advertiserId",
        "brand",
        "adVendor",
        "categoryId",
        "advertiserIntegrationId",
        "reportType",
        "repeatParticipateTypeId",
        "helpRequestPersonalInfoTypeIds",
        "advertiserCsManagerNames",
        "advertiserCsManagerEmails",
      ];
      return await trigger(step1Fields);
    }

    if (currentStep === 2) {
      const step2Fields: (keyof AdRequestStep2AdInfoType)[] = [
        "targetCookieovenPublisherIds",
        "adActionTypeId",
        "targetOs",
        "adTypeId",
        "startAt",
        "endAt",
        "targetTimes",
        "landingUrl",
        "viewAssets",
        "adSettleTypeId",
        "cost",
        "minPaymentAmount",
        "budget",
        "dailyActionCap",
        "delayTerm",
        "participateExpiredAt",
        "targetGenders",
        "targetAges",
        "targetAdisonPublisherIds",
      ];
      return await trigger(step2Fields);
    }

    return false;
  };

  const handleNext = async () => {
    const isCurrentStepValid = await validateCurrentStep(step);
    if (isCurrentStepValid && step < 2) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // 페이지 로드 시 저장된 데이터 확인
  useEffect(() => {
    const savedData = loadFormData<AdRequestCreateFormType>();
    if (savedData) {
      setSavedFormData(savedData);
      setShowRestoreModal(true);
    }
  }, []);

  // 페이지 이탈 시 폼 데이터 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isDirty) {
        saveFormData(watchedData);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isDirty) {
        saveFormData(watchedData);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isDirty, watchedData]);

  // 등록 버튼 클릭 시 확인 모달 표시
  const handleRegisterClick = async () => {
    const isCurrentStepValid = await validateCurrentStep(step);
    if (isCurrentStepValid) {
      setShowConfirmModal(true);
    }
  };

  // 실제 등록 처리
  const onSubmit = (data: AdRequestCreateFormType) => {
    console.log("제출 폼 데이터 >> ", data);
    clearFormData();
    setShowConfirmModal(false);

    //폼 등록 관련 로직 추가 필요....
    toast.success("광고 요청이 성공적으로 등록되었습니다!");

    router.push("/ad-requests");
  };

  // 모달에서 등록 확인 시 호출되는 함수
  const handleConfirmRegistration = () => {
    handleSubmit(onSubmit)();
  };

  // 확인 모달 취소
  const handleCancelRegistration = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="w-[60%] p-6">
          <StepProgress step={step} />
          {step === 1 && <CampaignForm control={control} setValue={setValue} />}
          {step === 2 && <AdForm control={control} setValue={setValue} />}
          <div className="mt-6 flex justify-between border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={step === 1}
              className={
                step === 1
                  ? `
                    cursor-not-allowed opacity-30
                    hover:opacity-30
                  `
                  : `
                    hover:bg-accent hover:text-accent-foreground
                    cursor-pointer
                  `
              }
            >
              이전
            </Button>
            <div className="flex gap-2">
              {step < 2 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="cursor-pointer"
                >
                  다음
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleRegisterClick}
                  className="cursor-pointer"
                >
                  등록
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="w-[40%] p-6">
          <PreviewPanel watchedData={watchedData} />
        </div>
      </div>

      {/* 이전 데이터 복원 모달 */}
      <Modal
        isOpen={showRestoreModal}
        onClose={discardFormData}
        onConfirm={restoreFormData}
        title="이전 작업 복원"
        description="이전에 진행하던 광고 등록 요청이 있습니다. 불러올까요?"
        cancelText="취소"
        confirmText="확인"
        size="sm"
      />

      {/* 등록 확인 모달 */}
      <ConfirmRegistrationModal
        isOpen={showConfirmModal}
        onClose={handleCancelRegistration}
        onConfirm={handleConfirmRegistration}
        formData={watchedData}
      />
    </div>
  );
};

export default CreateAdRequestPage;
