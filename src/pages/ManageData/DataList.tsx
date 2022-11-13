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
    <Screen.Content>
      <div className="flex flex-col items-center gap-4">
        {dataLinks.map((item) => (
          <Link
            className="w-1/2 p-4 text-2xl font-bold tracking-wider rounded shadow text-app-altText bg-app"
            to={item.to}
            key={item.to}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </Screen.Content>
  );
};
