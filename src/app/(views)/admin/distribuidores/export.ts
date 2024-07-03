import * as xlsx from "xlsx";

export const Export = (data:any) => {
  try {

    const alldata = data.map((item:any)=>{
      const  formatData = {
        "NOMBRES COMPLETOS":item.full_name,
        "CORREO":item.email,
        "CELULAR":item.country_code+item.phone,
        "DOCUMENTO DE IDENTIDAD":item.dni
      }
      return formatData
    })
   
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(alldata);
      /*  */
      xlsx.utils.book_append_sheet(workbook, worksheet, "Users");

      return xlsx.writeFile(workbook, "reporte-users.xlsx");
  } catch (error) {
    
  }
}