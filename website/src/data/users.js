
import { translate } from '@docusaurus/Translate';
import { sortBy } from '@site/src/utils/jsUtils';

const Users = [
    {
        title: 'Rolling Down the Yield Curve',
        description: 'Basic streamlit application to demonstrate the "rolling down the yield curve" strategy',
        preview: require('./showcase/rolling-down.png'),
        website: 'https://github.com/mgale694/rolling-down',
        source: 'https://github.com/mgale694/rolling-down',
        tags: ['favorite', 'python', 'finance', 'streamlit'],
    },
]

export const Tags = {
    favorite: {
        label: translate({ message: 'Favorite' }),
        description: translate({
            message:
                'My favorite projects!',
            id: 'showcase.tag.favorite.description',
        }),
        color: '#e9669e',
    },

    python: {
        label: translate({ message: 'Python' }),
        description: translate({
            message: 'Python related projects!',
            id: 'showcase.tag.python.description',
        }),
        color: '#39ca30',
    },

    finance: {
        label: translate({ message: 'Finance' }),
        description: translate({
            message: 'Finance related projects!',
            id: 'showcase.tag.finance.description',
        }),
        color: '#dfd545',
    },

    streamlit: {
        label: translate({ message: 'Streamlit' }),
        description: translate({
            message:
                'Projects that use Streamlit to create interactive web applications',
            id: 'showcase.tag.streamlit.description',
        }),
        color: '#a44fb7',
    },
}

export const TagList = Object.keys(Tags);

function sortUsers() {
    let result = Users;
    // Sort by site name
    result = sortBy(result, (user) => user.title.toLowerCase());
    // Sort by favorite tag, favorites first
    result = sortBy(result, (user) => !user.tags.includes('favorite'));
    return result;
}

export const sortedUsers = sortUsers();