import {
  LocalPaymentMethod as LocalBancontact,
  LocalPaymentMethod as LocalP24,
  LocalPaymentMethod as LocalBLIK,
  LocalPaymentMethod as LocalEPS,
  LocalPaymentMethod as LocalGiropay,
  LocalPaymentMethod as LocalGrabpay,
  LocalPaymentMethod as LocalIdeal,
  LocalPaymentMethod as LocalMyBank,
  LocalPaymentMethod as LocalSofort,
} from "./LocalPaymentMethod";
import {
  LocalPaymentBancontactType,
  LocalPaymentBLIKType,
  LocalPaymentEPSType,
  LocalPaymentGiropayType,
  LocalPaymentGrabpayType,
  LocalPaymentIDealType,
  LocalPaymentMyBankType,
  LocalPaymentP24Type,
  LocalPaymentSofortType,
} from "../../types";
export const Bancontact = LocalBancontact as LocalPaymentBancontactType;
export const P24 = LocalP24 as LocalPaymentP24Type;
export const Sofort = LocalSofort as LocalPaymentSofortType;
export const BLIK = LocalSofort as LocalPaymentBLIKType;
export const EPS = LocalSofort as LocalPaymentEPSType;
export const Giropay = LocalSofort as LocalPaymentGiropayType;
export const Grabpay = LocalSofort as LocalPaymentGrabpayType;
export const IDeal = LocalSofort as LocalPaymentIDealType;
export const MyBank = LocalSofort as LocalPaymentMyBankType;
