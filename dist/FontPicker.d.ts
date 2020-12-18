import { Category, Font, FontManager, Script, SortOption, Variant } from "@samuelmeuli/font-manager";
import React, { KeyboardEvent, PureComponent, ReactElement } from "react";
declare type LoadingStatus = "loading" | "finished" | "error";
interface Props {
    apiKey: string;
    activeFontFamily: string;
    onChange: (font: Font) => void;
    pickerId: string;
    families: string[];
    categories: Category[];
    scripts: Script[];
    variants: Variant[];
    filter: (font: Font) => boolean;
    limit: number;
    sort: SortOption;
    inputClassName: string;
    listClassName: string;
    isSearchable: boolean;
    rootClassName: string;
    activeClassName: string;
}
interface State {
    expanded: boolean;
    loadingStatus: LoadingStatus;
    searchValue: string;
}
export default class FontPicker extends PureComponent<Props, State> {
    fontManager: FontManager;
    static defaultProps: {
        activeFontFamily: string;
        onChange: () => void;
        pickerId: string;
        families: string[];
        categories: Category[];
        scripts: Script[];
        variants: Variant[];
        filter: (font: Font) => boolean;
        limit: number;
        sort: SortOption;
        inputClassName: string;
        listClassName: string;
        isSearchable: boolean;
        rootClassName: string;
        activeClassName: string;
    };
    state: Readonly<State>;
    constructor(props: Props);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: Props) => void;
    onClose: (e: MouseEvent) => void;
    onSelection: (e: React.MouseEvent | KeyboardEvent) => void;
    setActiveFontFamily: (activeFontFamily: string) => void;
    generateFontList: (fonts: Font[]) => ReactElement;
    toggleExpanded: () => void;
    handleSearchValueChage: (searchValue: string) => void;
    render: () => ReactElement;
}
export {};
//# sourceMappingURL=FontPicker.d.ts.map