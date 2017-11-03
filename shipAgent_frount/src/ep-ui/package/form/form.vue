<template>
	<form class="ep-form" :class="[
		namePosition ? 'ep-form--layout--' + namePosition : '',
		{'ep-form--inline': inline}]" @reset="reset">
		<slot></slot>
	</form>
</template>

<script>
	import emitter from './../../src/mixins/emitter';

	function findNum(label, match) {
		let res
		label.every((item, index) => {
			if (item.key === match) {
				res = index
				return false
			}
			return true
		})
		return res
	}

	export default {

		name: 'EpForm',

		mixins: [emitter],

		data () {
			return {
				fields: []
			}
		},
		props: {
			errIcon: Boolean,
			form: [Object, Array],
			nameWidth: String,
			namePosition: String,
			inline: Boolean,
			rules: Object
		},

		methods: {
			validate(callback) {
				let valid = true,
						count = 0

				this.fields.forEach((field, index) => {
					field.validate(errors => {
						if (errors) {
							valid = false
						}
						if (typeof callback === 'function' && ++count === this.fields.length) {
							callback(valid)
						}
					});
				});
			},
			reset() {
				this.broadcast('ep-form-item', 'reset')
				this.$nextTick(() => {
					this.clearError()
				})
			},
			getDefaultData() {
				return {...this.defaultData}
			},
			clearError() {
				this.broadcast('ep-form-item', 'clearError')
			},
      addNewItem (item) {
        if (item) {
					this.fields.push(item)
				}
      },
			delateItem (item) {
        let num = this.fields.indexOf(item)
        if (num !== -1) {
          this.fields.splice(num, 1)
        }
			}
		}
	}
</script>