class FormatMask {
  setPhoneFormatMask(phoneToFormat) {

    if(!phoneToFormat || phoneToFormat.length < 12){
      return phoneToFormat ? "+" + phoneToFormat : "";
    }

    const number = ("" + phoneToFormat).replace(/\D/g, "");

    // Formato especifico para Argentina (54 9 ...)
    if (number.startsWith("549") && number.length === 13) {
      // Si el código de área es 11 (Buenos Aires)
      if (number[3] === '1' && number[4] === '1') {
        const match = number.match(/^(\d{2})(\d)(\d{2})(\d{4})(\d{4})$/);
        if (match) return `+${match[1]} ${match[2]} (${match[3]}) ${match[4]}-${match[5]}`;
      } else {
        // Otros códigos de área (suele ser 3 dígitos)
        const match = number.match(/^(\d{2})(\d)(\d{3})(\d{3})(\d{4})$/);
        if (match) return `+${match[1]} ${match[2]} (${match[3]}) ${match[4]}-${match[5]}`;
      }
    }

    if (number.length <= 12) {
      const phoneNumberFormatted = number.match(/^(\d{2})(\d{2})(\d{4})(\d{4})$/);
      if (phoneNumberFormatted) {
        return `+${phoneNumberFormatted[1]} (${phoneNumberFormatted[2]}) ${phoneNumberFormatted[3]}-${phoneNumberFormatted[4]}`;
      }
    } else if (number.length === 13) {
      const phoneNumberFormatted = number.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
      if (phoneNumberFormatted) {
        return `+${phoneNumberFormatted[1]} (${phoneNumberFormatted[2]}) ${phoneNumberFormatted[3]}-${phoneNumberFormatted[4]}`;
      }
    }

    return "+" + number;
  }

  removeMask(number) {
    const filterNumber = number.replace(/\D/g, "");
    return filterNumber;
  }

  maskPhonePattern(phoneNumber){
    if(phoneNumber.length < 13){
      return '+55 (99) 9999 9999';
    }else{
      return '+55 (99) 99999 9999';
    }
  }
}

export { FormatMask };