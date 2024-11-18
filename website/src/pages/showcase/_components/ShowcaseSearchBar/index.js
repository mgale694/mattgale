import { translate } from '@docusaurus/Translate';
import { useSearchName } from '@site/src/pages/showcase/_utils';
import styles from './styles.module.css';

export default function ShowcaseSearchBar() {
  const [searchName, setSearchName] = useSearchName();
  return (
    <div className={styles.searchBar}>
      <input
        placeholder={translate({
          message: 'Search for site name...',
          id: 'showcase.searchBar.placeholder',
        })}
        value={searchName}
        onInput={(e) => {
          setSearchName(e.currentTarget.value);
        }}
      />
    </div>
  );
}
