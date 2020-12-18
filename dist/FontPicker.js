'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fontManager = require('@samuelmeuli/font-manager');
var React = require('react');
var React__default = _interopDefault(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function getFontId(fontFamily) {
    return fontFamily.replace(/\s+/g, "-").toLowerCase();
}
var FontPicker = (function (_super) {
    __extends(FontPicker, _super);
    function FontPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            expanded: false,
            loadingStatus: "loading",
            searchValue: "",
        };
        _this.componentDidMount = function () {
            _this.fontManager
                .init()
                .then(function () {
                _this.setState({
                    loadingStatus: "finished",
                });
            })["catch"](function (err) {
                _this.setState({
                    loadingStatus: "error",
                });
                console.error("Error trying to fetch the list of available fonts");
                console.error(err);
            });
        };
        _this.componentDidUpdate = function (prevProps) {
            var _a = _this.props, activeFontFamily = _a.activeFontFamily, onChange = _a.onChange;
            if (activeFontFamily !== prevProps.activeFontFamily) {
                _this.setActiveFontFamily(activeFontFamily);
            }
            if (onChange !== prevProps.onChange) {
                _this.fontManager.setOnChange(onChange);
            }
        };
        _this.onClose = function (e) {
            var targetEl = e.target;
            var fontPickerEl = document.getElementById("font-picker" + _this.fontManager.selectorSuffix);
            while (true) {
                if (targetEl === fontPickerEl) {
                    return;
                }
                if (targetEl.parentNode) {
                    targetEl = targetEl.parentNode;
                }
                else {
                    _this.toggleExpanded();
                    return;
                }
            }
        };
        _this.onSelection = function (e) {
            var target = e.target;
            var activeFontFamily = target.textContent;
            if (!activeFontFamily) {
                throw Error("Missing font family in clicked font button");
            }
            _this.setActiveFontFamily(activeFontFamily);
            _this.toggleExpanded();
        };
        _this.setActiveFontFamily = function (activeFontFamily) {
            _this.fontManager.setActiveFont(activeFontFamily);
        };
        _this.generateFontList = function (fonts) {
            var _a = _this.props, activeFontFamily = _a.activeFontFamily, listClassName = _a.listClassName;
            var _b = _this.state, loadingStatus = _b.loadingStatus, searchValue = _b.searchValue;
            if (loadingStatus !== "finished") {
                return React__default.createElement("div", null);
            }
            var filteredFonts = fonts.filter(function (currentFont) { return (currentFont.family.toLowerCase().startsWith(searchValue.toLowerCase())); });
            return (React__default.createElement("ul", { className: "font-list" }, filteredFonts.map(function (font) {
                var isActive = font.family === activeFontFamily;
                var fontId = getFontId(font.family);
                return (React__default.createElement("li", { key: fontId, className: "font-list-item " + listClassName },
                    React__default.createElement("button", { type: "button", id: "font-button-" + fontId + _this.fontManager.selectorSuffix, className: "font-button " + (isActive ? "active-font" : ""), onClick: _this.onSelection, onKeyPress: _this.onSelection }, font.family)));
            })));
        };
        _this.toggleExpanded = function () {
            var expanded = _this.state.expanded;
            if (expanded) {
                _this.setState({
                    expanded: false,
                });
                document.removeEventListener("click", _this.onClose);
            }
            else {
                _this.setState({
                    expanded: true,
                });
                document.addEventListener("click", _this.onClose);
            }
        };
        _this.handleSearchValueChage = function (searchValue) {
            _this.setState({
                searchValue: searchValue,
            });
        };
        _this.render = function () {
            var _a = _this.props, activeFontFamily = _a.activeFontFamily, sort = _a.sort, isSearchable = _a.isSearchable, inputClassName = _a.inputClassName, rootClassName = _a.rootClassName;
            var _b = _this.state, expanded = _b.expanded, loadingStatus = _b.loadingStatus, searchValue = _b.searchValue;
            var fonts = Array.from(_this.fontManager.getFonts().values());
            if (sort === "alphabet") {
                fonts.sort(function (font1, font2) { return font1.family.localeCompare(font2.family); });
            }
            return (React__default.createElement("div", { id: "font-picker" + _this.fontManager.selectorSuffix, className: (expanded ? "expanded" : "") + " " + rootClassName },
                !expanded ? (React__default.createElement("button", { type: "button", className: "dropdown-button", onClick: _this.toggleExpanded, onKeyPress: _this.toggleExpanded },
                    React__default.createElement("p", { className: "dropdown-font-family" }, activeFontFamily),
                    React__default.createElement("p", { className: "dropdown-icon " + loadingStatus }))) : expanded && isSearchable ? (React__default.createElement("input", { type: "text", className: "search-value " + inputClassName, value: searchValue, onChange: function (event) { return _this.handleSearchValueChage(event.target.value); } })) : null,
                loadingStatus === "finished" && _this.generateFontList(fonts)));
        };
        var _a = _this.props, apiKey = _a.apiKey, activeFontFamily = _a.activeFontFamily, pickerId = _a.pickerId, families = _a.families, categories = _a.categories, scripts = _a.scripts, variants = _a.variants, filter = _a.filter, limit = _a.limit, sort = _a.sort, onChange = _a.onChange, inputClassName = _a.inputClassName, listClassName = _a.listClassName, isSearchable = _a.isSearchable, rootClassName = _a.rootClassName;
        var options = {
            pickerId: pickerId,
            families: families,
            categories: categories,
            scripts: scripts,
            variants: variants,
            filter: filter,
            limit: limit,
            sort: sort,
            inputClassName: inputClassName,
            listClassName: listClassName,
            isSearchable: isSearchable,
            rootClassName: rootClassName
        };
        _this.fontManager = new fontManager.FontManager(apiKey, activeFontFamily, options, onChange);
        return _this;
    }
    FontPicker.defaultProps = {
        activeFontFamily: fontManager.FONT_FAMILY_DEFAULT,
        onChange: function () { },
        pickerId: fontManager.OPTIONS_DEFAULTS.pickerId,
        families: fontManager.OPTIONS_DEFAULTS.families,
        categories: fontManager.OPTIONS_DEFAULTS.categories,
        scripts: fontManager.OPTIONS_DEFAULTS.scripts,
        variants: fontManager.OPTIONS_DEFAULTS.variants,
        filter: fontManager.OPTIONS_DEFAULTS.filter,
        limit: fontManager.OPTIONS_DEFAULTS.limit,
        sort: fontManager.OPTIONS_DEFAULTS.sort,
        inputClassName: fontManager.OPTIONS_DEFAULTS.inputClassName,
        listClassName: fontManager.OPTIONS_DEFAULTS.listClassName,
        isSearchable: fontManager.OPTIONS_DEFAULTS.isSearchable,
        rootClassName: fontManager.OPTIONS_DEFAULTS.rootClassName,
    };
    return FontPicker;
}(React.PureComponent));

module.exports = FontPicker;
