import * as xlsx from "xlsx";

export const ExportOrders = (data: any) => {
  try {
    const alldata = data.map((item: any) => {
      const formatData = {
        "NOMBRES COMPLETOS": item.user.full_name,
        CORREO: item.user.email,
        CELULAR: item.country_code + item.phone,
        PLATAFORMA: item.platform.name,
        "FECHA DE PEDIDO": item.created_at,
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
