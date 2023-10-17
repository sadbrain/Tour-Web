
function Validator(formSelector, options = {}){
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    let formRules = {
        // mong muon 
        // name ; rules is array contain functions
    }
    // quy ước
    // nếu có lõi thì return message lỗi
    // nếu không có lỗi thì return unđifile
    let validatorRules = {
        required: function(value){
            return value ? undefined : "Vui lòng nhập trường này";
        },
        phone: function(value){
            const regex = /^(\d+-)*(\d+)$/; 
            return regex.test(value) ? undefined : "Số điện thoại nhập vào không chính xác";
        },
        email: function(value) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
            return regex.test(value) ? undefined : "Vui lòng nhập email";
       
        },
        password: function(value){
            let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return regex.test(value) ? undefined : "ít nhất 1 số, gồm chữ hoa và thường, một ký tự đặt biệt, ít nhất 8 kí tự";
        },
        minLength: function(min){
            return function(value){
                return value.length >= min ? undefined : `Vui lòng nhập ít nhât ${min} kí tự`;

            }
        },
        maxLength: function(max){
            return function(value){
                return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} kí tự`;

            }
        },
        min: function(min){
            return function(value){
                return value >= min ? undefined : `Vui lòng nhập số lớn hơn ${min}`;

            }
        },
        max: function(max){
            return function(value){
                return value <= max ? undefined : `Vui lòng nhập số nhỏ hơn ${max}`;

            }
        }
        

    }
    
    
    const formElement =  document.querySelector(formSelector);

    if(formElement){ 
        // láy những thằng input có rules và name 
        var inputs = formElement.querySelectorAll("[name][rules]");
        
        for(var input of inputs){
            // tách required|min:6 
            var rules = input.getAttribute("rules").split('|');
            for(let rule of rules){
                let ruleInfo;
                //check trường hợp có dấu :
                let isRuleHasValue = rule.includes(":");
                if(isRuleHasValue){
                    // tach min:6 
                    ruleInfo = rule.split(":");
                    rule = ruleInfo[0];
                }

                let ruleFunc = validatorRules[rule]; 
                // th ham trong ham thì muons thực hiện hàm ở phía bên trong
                // nên ruleFunc là hàm ngoài mình phải gọi nó và truyền tham số vào
                if(isRuleHasValue){
                    ruleFunc = ruleFunc([ruleInfo[1]]); 

                }
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);

                }else{
                 formRules[input.name] = [ruleFunc];
                    
                }
            }


            input.onblur = handleValidate;
            input.oninput = handleClearError;
            // console.log(rules);

        }
        function handleValidate(event)
        {
            //event.target lấy ra được element
            //láy những cái rule của phần tử nà để thực hiện validate
            // event.target.name => lấy ra name 
            // lấy ra rules từ formRule => formRules[event.target.name]
            let rules = formRules[event.target.name];
            let errorMessage;
            rules.find(rule => {
                errorMessage = rule(event.target.value);
                return errorMessage;
            })


            //hiển thị errorMessage ra UI
            //cần chọc lấy thằng form-message;

            if(errorMessage){
                let formGroup = getParent(event.target, '.form-group');
                if(formGroup){
                    formGroup.classList.add('invalid');
                     let formMessage = formGroup.querySelector(".form-message");
                    if(formMessage){
                        formMessage.innerHTML = errorMessage;

                    }
                }   

            }
            // chuyển từ kdl khác sang boolean
            return !errorMessage;            
        }


        function handleClearError(event){
            //cần chọc lấy thằng form-message;
            let formGroup = getParent(event.target, '.form-group');
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid');
                let formMessage = formGroup.querySelector(".form-message");
                formMessage.innerHTML = '';
                
            }
        }
        // sau đay ta đẫ được form chứa những cái rule
        //xử lý hành vi sumbit form
        formElement.onsubmit = function(event){
            event.preventDefault();
            var inputs = formElement.querySelectorAll("[name][rules]");
            var isValid = true;
            //mong muốn có lỗi thì set isValid = false 
            // khi có lỗi là lúc trả về errorMessage là một cái chuỗi
            // !errorMessage => false
            // !!errorMessage => true khi có lỗi 
            for(let input of inputs){
                if(!handleValidate({target: input}))
                {
                    isValid = false;
                }
            }

            if(isValid){
                if(typeof options.onSubmit === "function"){
                    let enableInputs = formElement.querySelectorAll("[name]");
                    let formValues = Array.from(enableInputs).reduce((values, input) => {
                        switch(input.type){
                            case 'radio': 
                                    values[ainput.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                    break;
                            case "checkbox":
                                if(!input.checked) {
                                    values[input.name] = "";
                                    return values;
                                }
                                if(Array.isArray(values[input.name])){
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                 values[input.name] = input.files;
                                 break;
                            default:
                                console.log()

                                values[input.name] = input.value;
                        }
                        return values;
                    }, {})

                    options.onSubmit(formValues);
                }else if(typeof options.otherFunc === "function"){
                    options.otherFunc();

                }
                else{
                    formElement.submit();
                }
                
            }
        }
        
    }
}