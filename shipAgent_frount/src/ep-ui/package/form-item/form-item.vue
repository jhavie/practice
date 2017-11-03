<template>
	<div class="ep-form--item" :class="{
		'is-required': isRequired, 'is-focus': isFocus, 'is-error': hasError, 'is-icon': errIcon }">
		<label v-if="label" for="" class="ep-form--label" :style="{ width: layoutStyle }">{{ label }}</label>
		<div class="ep-form--content" :style="{ marginLeft: layoutStyle }">
			<slot></slot>
			<transition name="ep-form-error-show">
				<div v-if="hasError && showMessage && !errIcon" class="ep-form--error">{{ errorMsg }}</div>
			</transition>
			<ep-tooltip v-show="errIcon && hasError" :content="errorMsg" placement="top-end" :disabled="!hasError">
				<i class="ep-form--error-icon ion-android-alert"></i>
			</ep-tooltip>
			<div v-if="count && maxLength !== 0" class="ep-form--count">{{ length }} / {{ maxLength }}</div>
		</div>
	</div>
</template>

<script>
	import AsyncValidator from 'async-validator'
	import emitter from './../../src/mixins/emitter'
	
	function noop() {}

	function getAttrByPath(obj, path) {
		let tempObj = obj;
		path = path.replace(/\[(\w+)\]/g, '.$1')
		path = path.replace(/^\./, '')

		let keyArr = path.split('.')
		let i = 0

		for (let len = keyArr.length; i < len - 1; ++i) {
			let key = keyArr[i]
			if (key in tempObj) {
				tempObj = tempObj[key]
			} else {
				throw new Error('please transfer a valid prop path to form item!')
			}
		}
		return {
			o: tempObj,
			k: keyArr[i],
			v: tempObj[keyArr[i]]
		};
	}

	export default {

		name: 'EpFormItem',

		mixins: [emitter],

		mounted () {
				this.init()
				if (this.attr) {
					this.form.addNewItem(this)
					this.initValidate()
				}
		},

		computed: {

			form () {
				let parent = this.$parent
				while (parent.$options._componentTag !== 'ep-form') {
					parent = parent.$parent
				}
				return parent
			},
			rules () {
				let ret = {}

				if (this.rule) {
					ret = this.rule
				} else {
					if (this.form.rules !== undefined) {
						if (this.form.rules.hasOwnProperty(this.attr)) {
							ret = this.form.rules[this.attr]
						}
					}
				}

				return ret;
			},
			errIcon () {
				return this.form.errIcon
			},
			layoutStyle () {
				let ret;

				if (this.width) {
					ret = this.width
				} else {
					const nameWidth = this.form.nameWidth
					ret = nameWidth ? nameWidth: '80px'
				}
				if (this.form.namePosition === 'top'
					|| this.form.inline) {
					ret = null
				}
				return ret
			},
			isRequired () {
				if (this.required !== undefined) {
					return this.required
				}
				return this.rules.required
			},
			fieldValue: {
				cache: false,
				get() {
					let model = this.form.form
					if (!model || !this.attr) { return }

					let path = this.attr
					if (path.indexOf(':') !== -1) {
						path = path.replace(/:/, '.')
					}

					return getAttrByPath(model, path).v
				}
			}
		},

		props: {
			required: {
				type: Boolean,
				default: undefined
			},
			count: Boolean,
			label: String,
			rule: Object,
			attr: String,
			showMessage: {
				type: Boolean,
				default: true
			}
		},

		data () {
			return {
				input: undefined,
				defaultVal: '',
				length: 0,
				maxLength: 0,
				errorMsg: '',
				isFocus: false,
				hasError: false
			}
		},

		methods: {
			validate (callback = noop) {
				if (!this.rules || this.rules.length === 0) {
					callback()
					return true
				}

				let descriptor = {}
				descriptor[this.attr] = this.rules
				let validator = new AsyncValidator(descriptor)
				let model = {}
			
				model[this.attr] = this.fieldValue
				
				validator.validate(model, { firstFields: true }, (errors, fields) => {
					// this.validateState = !errors ? 'success' : 'error';
					this.hasError = errors ? true: false
					this.errorMsg = errors ? errors[0].message : ''
					callback(this.errorMsg)
				});
			},
			clearError () {
				if (this.hasError) {
					this.hasError = false
					this.errorMsg = true
				}
			},
			needViladate (type) {
				let trigger = '';
				if (this.rules.hasOwnProperty('trigger')) {
					trigger = this.rules.trigger
					if (trigger.indexOf(type) !== -1) {
						return true
					}
				}
				return false;
			},
			onFieldBlur (val) {
				this.isFocus = false
				if (this.needViladate('blur')) {
					this.validate()
				}
			},
			onFieldFocus () {
				this.isFocus = true
			},
			onFieldChange (val) {
				if (this.needViladate('change')) {
					this.length = val.length
					this.validate()
				}
			},
      resetVal () {
        // if (vm.input !== undefined) {
        //   vm.input.resetVal.call(vm.input, vm.defaultVal)
        // }
        let model = this.form.form
        if (!model || !this.attr) { return }

        let path = this.attr
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.')
        }

        let prop = getAttrByPath(model, path)

        if (Array.isArray(this.fieldValue)) {
          prop.o[prop.k] = [].concat(this.defaultVal)
        } else {
          prop.o[prop.k] = this.defaultVal
        }
      },
			init () {
				let vm = this
        if (this.attr) {
          this.defaultVal = this.fieldValue
        }
				this.$on('ep.form.blur', this.onFieldBlur)
				this.$on('ep.form.focus', this.onFieldFocus)
				this.$on('ep.form.change', this.onFieldChange)
        this.$on('reset', () => {
          vm.resetVal()
        })
				this.$on('ep.form.init', (length, maxLength) => {
					vm.length = length
					vm.maxLength = maxLength
				})
			},
			initValidate () {
				this.$on('clearError', this.clearError)
				this.$on('validate', this.validate)
			}
		},

		beforeDestroy () {
			this.form.delateItem(this)
		}
	}
</script>