import { useGoogleReCaptcha } from "react-google-recaptcha-v3";


const useCaptchaGoogle = (sucessCallback : () => void, errorCallback: (errorMessage: string | null) => void) => {


    const { executeRecaptcha } = useGoogleReCaptcha();


    const executeRecaptchaGoogle = async (body: any) => {
        if(!executeRecaptcha){
            console.log('no executeRecaptcha')
            errorCallback(null)
        }else{
            const gReCaptchaToken = await executeRecaptcha("enquiryFormSubmit")
            const isGood = await isGoodCaptcha(gReCaptchaToken, body );
            if(!isGood){
                console.log('goodCaptcha')
                sucessCallback();
                return true;
            }else{
                console.log('captchaNotGood');
                errorCallback(null);
                return false
            }
        }

    }
    const isGoodCaptcha = async (gReCaptchaToken : any, body: any) => {
        try{
            const response = await fetch("/api/captcha/enquiry", {
                method: "POST",
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...body,
                  gRecaptchaToken: gReCaptchaToken,
                }),
              })
              
            const captchResult = await response.json();
            if(captchResult.success === "success") { 
                return true;
            }else{
                return false;
            }
        }catch(err: any){
            console.log(err.message)
            errorCallback(null);
            return false;
        }

   
      };

    return {
        executeRecaptchaGoogle
    }
}

export default  useCaptchaGoogle