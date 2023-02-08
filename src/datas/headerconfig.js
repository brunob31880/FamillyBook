import { isMobileDevice } from "../utility/DeviceUtils"
export const panelLink = (dimension) => !isMobileDevice(dimension) ? {
    "1": { link: "create", icon: "add", road: "create_link" },
    "2": { link: "Docs", icon: "library_books", road: "richtext" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "Book", icon: "book", road: "books" },
    "5": { link: "Audio", icon: "audiotrack", road: "audios" },
    "6": { link: "leave", icon: "directions_run", road: "leave" },
} : {
    "1": { link: "create", icon: "add", road: "create_link" },
    "2": { link: "Home", icon: "home", road: "home" },
    "3": { link: "Book", icon: "book", road: "books" },
    "4": { link: "leave", icon: "directions_run", road: "leave" },
};
export const panelRichText = (dimension) => !isMobileDevice(dimension) ? {
    "1": { link: "create", icon: "add", road: "create_richtext" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "Book", icon: "book", road: "books" },
    "5": { link: "Audio", icon: "audiotrack", road: "audios" },
    "6": { link: "leave", icon: "directions_run", road: "leave" },
} : {
    "1": { link: "create", icon: "add", road: "create_richtext" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "Book", icon: "book", road: "books" },
    "5": { link: "leave", icon: "directions_run", road: "leave" },
};
export const panelHome = (dimension) => !isMobileDevice(dimension) ? {
    "1": { link: "links", icon: "insert_link", road: "links" },
    "2": { link: "Docs", icon: "text_fields", road: "richtext" },
    "3": { link: "Book", icon: "book", road: "books" },
    "4": { link: "Audio", icon: "audiotrack", road: "audios" },
    "5": { link: "leave", icon: "directions_run", road: "leave" },
} : {
    "1": { link: "links", icon: "insert_link", road: "links" },
    "2": { link: "Book", icon: "book", road: "books" },
    "3": { link: "leave", icon: "directions_run", road: "leave" },
};
export const panelBook = (dimension) => !isMobileDevice(dimension) ? {
    "1": { link: "create", icon: "add", road: "create_book" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Docs", icon: "text_fields", road: "richtext" },
    "4": { link: "Home", icon: "home", road: "home" },
    "5": { link: "Audio", icon: "audiotrack", road: "audios" },
    "6": { link: "leave", icon: "directions_run", road: "leave" },
} : {
    "1": { link: "create", icon: "add", road: "create_book" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "leave", icon: "directions_run", road: "leave" },
};
export const panelAudio = (dimension) => !isMobileDevice(dimension) ? {
    "1": { link: "create", icon: "add", road: "create_audio" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Docs", icon: "text_fields", road: "richtext" },
    "4": { link: "Home", icon: "home", road: "home" },
    "5": { link: "Book", icon: "library_books", road: "books" },
    "6": { link: "leave", icon: "directions_run", road: "leave" },
} : {
    "1": { link: "create", icon: "add", road: "create_audio" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "Book", icon: "library_books", road: "books" },
    "5": { link: "leave", icon: "directions_run", road: "leave" },
};