import { parse } from 'vue-docgen-api'
import fs from 'fs-extra'
import glob from 'glob';
import _ from 'lodash-es'

const componentFiles = glob.sync("./src/components/*/*.vue");
const docgenObj = {};
console.log("Building docgen file...");
await Promise.all(componentFiles.map(async (filePath) => {
    let parsedComponentFile = await parse(filePath);
    docgenObj[parsedComponentFile.displayName] = parsedComponentFile;
    _.forIn(docgenObj, (component) => {
        component.props?.forEach((prop) => {
            if ( _.has(prop, 'defaultValue.value')) {
                if (prop.defaultValue.value === 'false') {
                    prop.defaultValue.value = false;
                }
                if (prop.defaultValue.value === 'true') {
                    prop.defaultValue.value = true;
                }
                if (prop.defaultValue.value === '[]') {
                    prop.defaultValue.value = [];
                }
                prop.defaultValue.value = trimApostrophes(prop.defaultValue.value)
            }
        });
    })
}));

function trimApostrophes(str) {
    if( str && str[0] === "'" && str[-1] === "'"){
        return str.slice(1, -1);
    }
    return str;
}

function formatForLiveDemo(componentList, docgenObj) {
    _.forIn(docgenObj, (component) => {
        component.props?.forEach((prop) => {
            if (prop.tags) {
                _.forIn(prop.tags, (tag) => {
                    let { title, description } = tag[0];
                    prop[title] = description;
                })
                delete prop.tags;
            }
            _.forIn(docgenObj, (component) => {
                component.props?.forEach((prop) => {
                    if ( _.has(prop, 'defaultValue.value')) {
                        prop.defaultValue = prop.defaultValue.value;
                    }
                });
            })
        });

        //Remove demoignored tags
        component.props = component.props?.filter((prop) => {
            return prop.demoIgnore !== "true"
        })

        //Group checkboxes
        component.demoCheckboxes = [];
        component.props?.forEach((prop) => {
            if (prop.type.name === 'boolean') {
                component.demoCheckboxes.push(prop)
            }
        })

        component.demoCheckboxGroups = [];
        component.props?.forEach((prop) => {
            if (prop.demoSelectMultiple === 'true') {
                component.demoCheckboxGroups.push(prop)
            }
        })

        component.demoRadioGroups = [];
        component.props?.forEach((prop) => {
            if (prop.demoSelectMultiple === 'false') {
                component.demoRadioGroups.push(prop)
            }
        })
    });

    let returnObj = {
        checkboxes: [],
        checkboxGroups: [],
        radioGroups: []
    };

    componentList.forEach((componentName) => {
        let componentObj = docgenObj[componentName];

        componentObj.demoCheckboxes.forEach((checkbox) => {
            checkbox.componentName = componentName;
            checkbox.propName = _.kebabCase(checkbox.name);
            delete checkbox.type;
        })

        componentObj.demoCheckboxGroups.forEach((checkboxGroup) => {
            checkboxGroup.componentName = componentName;
            checkboxGroup.propName = _.kebabCase(checkboxGroup.name);
            checkboxGroup.checkboxes = [];
            checkboxGroup.defaultValue = (!checkboxGroup.defaultValue) ? [] : [checkboxGroup.defaultValue];
            checkboxGroup.values.forEach((value) => {
                checkboxGroup.checkboxes.push({ propName: checkboxGroup.propName, label: value, trueValue: value, falseValue: '', defaultValue: (checkboxGroup.defaultValue.indexOf(value) !== -1) ? true : false })
            })
        })
        componentObj.demoRadioGroups.forEach((radioGroup) => {
            radioGroup.componentName = componentName;
            radioGroup.propName = _.kebabCase(radioGroup.name);
            radioGroup.radioButtons = [];
            radioGroup.values.forEach((value) => {
                radioGroup.radioButtons.push({ propName: radioGroup.propName, label: value, customValue: value })
            })
        })

        returnObj.checkboxes = returnObj.checkboxes.concat(componentObj.demoCheckboxes);
        returnObj.checkboxGroups = returnObj.checkboxGroups.concat(componentObj.demoCheckboxGroups);
        returnObj.radioGroups = returnObj.radioGroups.concat(componentObj.demoRadioGroups);
    })
    return returnObj;
}
fs.writeJsonSync('./dist/component-docgen.json', docgenObj, { spaces: 2 });
console.log("Docgen built");
