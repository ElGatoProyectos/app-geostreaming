import * as xlsx from "xlsx";

export const ExportDeposits = (data: any) => {
  try {
    const alldata = data.map((item: any) => {
      const formatData = {
        "FECHA DE REGISTRO": item.date,
        VALOR: item.value,
        ESTADO: item.status==="UNREAD"?"No atendido":"Atendido",
        URL: item.voucher_url,
      };
      return formatData;
    });

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(alldata);
    /*  */
    xlsx.utils.book_append_sheet(workbook, worksheet, "Users");

    return xlsx.writeFile(workbook, "reporte-pedidos.xlsx");
  } catch (error) {}
};
