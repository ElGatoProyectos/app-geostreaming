import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface FormattedDateProps {
  dateString: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ dateString }) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "PPPp", { locale: es });
  return <span>{formattedDate}</span>;
};

export default FormattedDate;
