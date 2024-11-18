
import React, { useCallback, useId } from 'react';
import { useTags } from '../../_utils';

import styles from './styles.module.css';

function useTagState(tag) {
  const [tags, setTags] = useTags();
  const isSelected = tags.includes(tag);
  const toggle = useCallback(() => {
    setTags((list) => {
      return list.includes(tag)
        ? list.filter((t) => t !== tag)
        : [...list, tag];
    });
  }, [tag, setTags]);

  return [isSelected, toggle];
}



export default function ShowcaseTagSelect({
  icon,
  label,
  description,
  tag,
  ...rest
}) {
  const id = useId();
  const [isSelected, toggle] = useTagState(tag);
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={isSelected}
        onChange={toggle}
        className="screen-reader-only"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            toggle();
          }
        }}
        {...rest}
        style={{ display: 'none' }}
      />
      <label htmlFor={id} className={styles.checkboxLabel} title={description}>
        {label}
        {icon}
      </label>
    </>
  );
}
