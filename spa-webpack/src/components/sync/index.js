// lodash-es可以按需引用
import lodash from "lodash-es"
import item from "./sync.css"
const sync = () => {
	console.log("sync")
	// document.getElementById("app").innerHTML = `<h1 class="${item.test}">Jarrett</h1>`
}

const isArrayFunc = (args) => {
	console.log(lodash.isArray(args))
}

export {
	sync,
	isArrayFunc
}

/**
 * npm run prod
 * css hint
 */
