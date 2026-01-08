import TemplatePointers from "./components/TemplatePointers"



function LandingIntro(){

    return(
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
              <div className="max-w-md">
              <div className=" flex justify-center">
              <img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1700542084/Screenshot_2023-11-20_145257_kuhrlz.png"} alt="dashwind-logo" className="text-center "/>
              </div>


                <div className="text-center mt-12"><img src={"https://res.cloudinary.com/dqslvlm0d/image/upload/v1700542208/intro_k3zc3z.png"} alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>
              
              {/* Importing pointers component */}
              <TemplatePointers />
              
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro