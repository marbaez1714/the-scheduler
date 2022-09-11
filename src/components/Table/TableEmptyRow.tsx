export const TableEmptyRow = () => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <tr className="transition-all border-b last:border-b-0 text-app-text/25">
      <td className="px-6 py-4 text-lg text-center" colSpan={100}>
        (No results)
      </td>
    </tr>
  );
};
