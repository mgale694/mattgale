
import { translate } from '@docusaurus/Translate';
import { sortBy } from '@site/src/utils/jsUtils';

const Users = [
    {
        title: 'AgileTs',
        description: 'Global State and Logic Framework for reactive Applications',
        preview: require('./showcase/temp.png'),
        website: 'https://agile-ts.org/',
        source: 'https://github.com/agile-ts/documentation',
        tags: ['favorite', 'opensource'],
    },
    {
        title: "Akara's blog",
        description: 'Personal frontend blog for learning',
        preview: require('./showcase/temp.png'),
        website: 'https://messiahhh.github.io/blog/',
        source: 'https://github.com/messiahhh/blog',
        tags: ['opensource', 'personal'],
    },
    {
        title: 'Algolia DocSearch',
        description:
            'The best search experience for docs, integrates in minutes, for free',
        preview: require('./showcase/temp.png'),
        website: 'https://docsearch.algolia.com/',
        source: 'https://github.com/algolia/docsearch/tree/main/packages/website',
        tags: ['favorite', 'opensource', 'product'],
    },
]

export const Tags = {
    favorite: {
        label: translate({ message: 'Favorite' }),
        description: translate({
            message:
                'Our favorite Docusaurus sites that you must absolutely check out!',
            id: 'showcase.tag.favorite.description',
        }),
        color: '#e9669e',
    },

    opensource: {
        label: translate({ message: 'Open-Source' }),
        description: translate({
            message: 'Open-Source Docusaurus sites can be useful for inspiration!',
            id: 'showcase.tag.opensource.description',
        }),
        color: '#39ca30',
    },

    product: {
        label: translate({ message: 'Product' }),
        description: translate({
            message: 'Docusaurus sites associated to a commercial product!',
            id: 'showcase.tag.product.description',
        }),
        color: '#dfd545',
    },

    design: {
        label: translate({ message: 'Design' }),
        description: translate({
            message:
                'Beautiful Docusaurus sites, polished and standing out from the initial template!',
            id: 'showcase.tag.design.description',
        }),
        color: '#a44fb7',
    },

    i18n: {
        label: translate({ message: 'I18n' }),
        description: translate({
            message:
                'Translated Docusaurus sites using the internationalization support with more than 1 locale.',
            id: 'showcase.tag.i18n.description',
        }),
        color: '#127f82',
    },

    versioning: {
        label: translate({ message: 'Versioning' }),
        description: translate({
            message:
                'Docusaurus sites using the versioning feature of the docs plugin to manage multiple versions.',
            id: 'showcase.tag.versioning.description',
        }),
        color: '#fe6829',
    },

    large: {
        label: translate({ message: 'Large' }),
        description: translate({
            message:
                'Very large Docusaurus sites, including many more pages than the average!',
            id: 'showcase.tag.large.description',
        }),
        color: '#8c2f00',
    },

    meta: {
        label: translate({ message: 'Meta' }),
        description: translate({
            message: 'Docusaurus sites of Meta (formerly Facebook) projects',
            id: 'showcase.tag.meta.description',
        }),
        color: '#4267b2', // Facebook blue
    },

    personal: {
        label: translate({ message: 'Personal' }),
        description: translate({
            message:
                'Personal websites, blogs and digital gardens built with Docusaurus',
            id: 'showcase.tag.personal.description',
        }),
        color: '#14cfc3',
    },

    rtl: {
        label: translate({ message: 'RTL Direction' }),
        description: translate({
            message:
                'Docusaurus sites using the right-to-left reading direction support.',
            id: 'showcase.tag.rtl.description',
        }),
        color: '#ffcfc3',
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