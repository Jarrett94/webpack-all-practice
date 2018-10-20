import lodash from "lodash-es"
import item from "./sync.css"
import help from "../common/help"
const sync = () => {
	console.log("sync")
	// document.getElementById("app").innerHTML = `<h1 class="${item.test}">Jarrett</h1>`
}

const isArrayFunc = (args) => {
	console.log(lodash.isArray(args))
}

const isDateFunc = (args) => {
	console.log(lodash.isDate(args))
}

export {
	sync,
	isArrayFunc,
	isDateFunc
}
