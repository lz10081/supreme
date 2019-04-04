const saveOptions = (e) => {
  e.preventDefault();
  chrome.storage.local.set({'autofill': {
    order_billing_name:       document.querySelector("#order_billing_name").value,
    order_email:              document.querySelector("#order_email").value,
    order_tel:                document.querySelector("#order_tel").value,
    bo:                       document.querySelector("#bo").value,
    oba3:                     document.querySelector("#oba3").value,
    order_billing_city:       document.querySelector("#order_billing_city").value,
    order_billing_zip:        document.querySelector("#order_billing_zip").value,
    order_billing_country:    document.querySelector("#order_billing_country").value,
	order_billing_state: 	  document.querySelector("#order_billing_state").value,
    number:                      document.querySelector("#nnaerb").value,
    credit_card_month:        document.querySelector("#credit_card_month").value,
    credit_card_year:         document.querySelector("#credit_card_year").value,
    orcer:                     document.querySelector("#orcer").value,
  }});
};

const setCurrentChoice = (config) => {
  document.querySelector("#order_billing_name").value       = config.order_billing_name || "";
  document.querySelector("#order_email").value              = config.order_email || "";
  document.querySelector("#order_tel").value                = config.order_tel || "";
  document.querySelector("#bo").value                       = config.bo || "";
  document.querySelector("#oba3").value                     = config.oba3 || "";
  document.querySelector("#order_billing_city").value       = config.order_billing_city || "";
  document.querySelector("#order_billing_zip").value        = config.order_billing_zip || "";
  document.querySelector("#order_billing_state").value   	= config.order_billing_state || "NY";
  document.querySelector("#order_billing_country").value    = config.order_billing_country || "USA";
  document.querySelector("#number").value                      = config.nnaerb || "";
  document.querySelector("#credit_card_month").value        = config.credit_card_month || "04";
  document.querySelector("#credit_card_year").value         = config.credit_card_year || "2019";
  document.querySelector("#orcer").value                     = config.orcer || "";
};

document.addEventListener("DOMContentLoaded", chrome.storage.local.get(['autofill'], setCurrentChoice));
document.querySelector("form").addEventListener("submit", saveOptions);