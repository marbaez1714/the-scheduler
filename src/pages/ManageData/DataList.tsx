import { Link } from 'react-router-dom';
import { Screen } from 'src/components/Screen';
import { dataLinks } from './utils';

export const DataList = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Screen.Content column className="gap-4">
      {dataLinks.map((item) => (
        <Link
          className="w-full p-4 text-2xl font-bold rounded shadow text-app-altText bg-app"
          to={item.to}
        >
          {item.name}
        </Link>
      ))}
    </Screen.Content>
  );
};
