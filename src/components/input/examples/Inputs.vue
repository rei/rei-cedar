<template>
  <div>
    <h2>
      Text Inputs
    </h2>
    <div data-backstop="input-target">
      <cdr-input
        label-class="demo-input"
        v-model="defaultModel"
        label="Default"
        :background="backgroundColor"
      />

      <cdr-input
        label-class="demo-input"
        v-model="requiredModel"
        label="Required"
        required
        :background="backgroundColor"
      />

      <cdr-input
        label-class="demo-input"
        v-model="optionalModel"
        label="Optional"
        optional
        :background="backgroundColor"
      />
    </div>

    <cdr-input
      label-class="demo-input"
      v-model="hiddenModel"
      label="This has no label"
      hide-label
      :background="backgroundColor"
    />

    <cdr-input
      label-class="demo-input"
      v-model="disabledModel"
      label="Disabled Input"
      data-backstop="input-disabled"
      disabled
      :background="backgroundColor"
    />

    <cdr-input
      label-class="demo-input"
      v-model="sizeModel"
      label="Large Input"
      size="large"
      :background="backgroundColor"
    />
    <cdr-input
      label-class="demo-input"
      v-model="sizeModel"
      label="Large@xs Input"
      size="large@xs"
      :background="backgroundColor"
    />
    <cdr-input
      label-class="demo-input"
      v-model="sizeModel"
      label="Large@sm Input"
      size="large@sm"
      :background="backgroundColor"
    />
    <cdr-input
      label-class="demo-input"
      v-model="sizeModel"
      label="Large@md Input"
      size="large@md"
      :background="backgroundColor"
    />
    <cdr-input
      label-class="demo-input"
      v-model="sizeModel"
      label="Large@lg Input"
      size="large@lg"
      :background="backgroundColor"
    />

    <cdr-input
      label-class="demo-input"
      v-model="requiredWithIcons"
      id="required-with-icon"
      label="Required with Icon"
      required
      type="email"
      :background="backgroundColor"
    >
      <template #info-action>
        <cdr-link
          tag="button"
          type="button"
        >
          <icon-information-stroke inherit-color />
          <span class="sr-only">Information!</span>
        </cdr-link>
      </template>
      <template #pre-icon>
        <cdr-icon
          use="#twitter"
        />
      </template>
      <template #post-icon>
        <cdr-icon
          use="#check-lg"
        />
      </template>
      <template #helper-text>
        This is helper text. Input length: {{ requiredWithIcons.length }}
      </template>
    </cdr-input>

    <form>
      <cdr-input
        label-class="demo-input"
        v-model="formWithButtons"
        id="form-example"
        label="Form with Two Buttons"
        required
        type="email"
        autocomplete="username"
        :background="backgroundColor"
      >
        <template #pre-icon>
          <cdr-icon
            use="#twitter"
          />
        </template>
        <template #post-icon>
          <cdr-tooltip
            class="cdr-input__button"
            id="input-tooltip"
          >
            <template #trigger>
              <cdr-button
                :icon-only="true"
                aria-label="navigate"
              >
                <icon-map />
              </cdr-button>
            </template>
            hey where am i?
          </cdr-tooltip>
          <cdr-button
            :icon-only="true"
            class="cdr-input__button"
            aria-label="close"
          >
            <icon-x-lg />
          </cdr-button>
        </template>
      </cdr-input>
    </form>

    <cdr-input
      label-class="demo-input"
      v-model="helperValidationModel"
      :error="helperValidationError"
      @blur="validate"
      label="Top helper with status validation"
      :background="backgroundColor"
    >
      <template #helper-text-top>
        <span id="myHelpText">Must be 4 or less characters</span>
      </template>

      <template #error>
        <span>you have added too many characters, remove some</span>
      </template>

      <template #info>
        <cdr-link
          modifier="standalone"
          href="#/inputs"
        >
          Support link
        </cdr-link>
      </template>
    </cdr-input>

    <cdr-input
      label-class="demo-input"
      v-model="helperValidationModel"
      :error="errorFromProps"
      @blur="validate"
      label="Top helper with status validation"
      :background="backgroundColor"
    >
      <template #error>
        <span>this error comes from slots, and will override any errors from props</span>
      </template>

      <template #info>
        <cdr-link
          modifier="standalone"
          href="#/inputs"
        >
          Support link
        </cdr-link>
      </template>
    </cdr-input>
    <cdr-input
        label-class="demo-input"
        v-model="dateModel"
        label="Date"
        :background="backgroundColor"
        type="date"
        min="2023-01-01"
      />
      <cdr-input
        label-class="demo-input"
        v-model="dateTimeModel"
        label="Datetime-local"
        :background="backgroundColor"
        type="datetime-local"
        min="2023-01-01"
      />
    <cdr-input
      label-class="demo-input"
      v-model="helperValidationModel"
      :error="errorFromProps"
      @blur="validate"
      label="Top helper with status validation"
      :background="backgroundColor"
    >
      <template #info>
        <cdr-link
          modifier="standalone"
          href="#/inputs"
        >
          Support link
        </cdr-link>
      </template>
    </cdr-input>

    <cdr-input
      label-class="demo-input"
      :required="true"
      v-model="megaModel"
      :error="megaErr"
      error-role="alert"
      id="inputWithError"
      label="Everything at the same time, alert validation"
      @blur="megaErr = false"
      size="large"
    >
      <icon-map #pre-icon />
      <template #helper-text-top>
        <span id="topHelp">Hey im on top of the input!</span>
      </template>
      <template #helper-text-bottom>
        <span id="bottomHelp">Hey im below the input!</span>
      </template>
      <template #info>
        <cdr-link
          href="#baz"
          modifier="standalone"
        >
          Hey im also on top of the input!
        </cdr-link>
      </template>
      <template #info-action>
        <cdr-link
          tag="button"
          type="button"
        >
          <span class="sr-only">I trigger some sort of action!</span>
          <icon-check-stroke inherit-color />
        </cdr-link>
      </template>
      <template #post-icon>
        <cdr-tooltip
          class="cdr-input__button"
          id="mega-tooltip"
        >
          <template #trigger>
            <cdr-button
              :icon-only="true"
              @click="megaErr = 'you have five minutes to fix this'"
              size="large"
              aria-label="Click me to cause an error"
            >
              <icon-x-stroke />
            </cdr-button>
          </template>
          I put the input into an error state!
        </cdr-tooltip>
        <cdr-popover
          class="cdr-input__button"
          id="mega-popover"
        >
          <template #trigger>
            <cdr-button
              :icon-only="true"
              size="large"
              aria-label="Hello"
            >
              <icon-information-stroke />
            </cdr-button>
          </template>
          Hey What's Up?
        </cdr-popover>
      </template>
    </cdr-input>

    <cdr-input
      class="demo-input "
      v-model="multiRowModel"
      :rows="10"
      label="Multi Line Input/TextArea"
      :background="backgroundColor"
    />
    <cdr-input
      class="demo-input "
      v-model="masterModel"
      @input="onMasterInput"
      label="Master input that overwrites all other inputs on this page"
      :background="backgroundColor"
    />

    <div class="demo-input">
      Default Input Value = {{ defaultModel }}
    </div>
    <div class="demo-input">
      Required Input Value = {{ requiredModel }}
    </div>
    <div class="demo-input">
      Optional Input Value = {{ optionalModel }}
    </div>
    <div class="demo-input">
      Hidden Input Value = {{ hiddenModel }}
    </div>
    <div class="demo-input">
      Disabled Input Value = {{ disabledModel }}
    </div>
    <div class="demo-input">
      With Icons Input Value = {{ requiredWithIcons }}
    </div>
    <div class="demo-input">
      Form With Buttons Value = {{ formWithButtons }}
    </div>
    <div class="demo-input">
      Date Input Value = {{ dateModel }}
    </div>
    <div class="demo-input">
      Helper/Validation Input Value = {{ helperValidationModel }}
    </div>
    <div class="demo-input">
      Multi Row Input Value = {{ multiRowModel }}
    </div>
    <div class="demo-input">
      Size Inputs Value = {{ sizeModel }}
    </div>

    <div class="demo-input">
      Mega Input Value = {{ megaModel }}
    </div>
    <div class="demo-input">
      Master Inputs Value = {{ masterModel }}
    </div>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Inputs',
  components: {
    ...Components,
  },
  data() {
    return {
      defaultModel: '',
      requiredModel: '',
      optionalModel: '',
      hiddenModel: '',
      dateModel: '',
      dateTimeModel: '',
      disabledModel: '',
      errorFromProps: 'this error is from props and will appear if no slotted template is provided',
      helperValidationModel: '',
      helperValidationError: true,
      requiredWithIcons: '',
      multiRowModel: '',
      sizeModel: '',
      formWithButtons: '',
      masterModel: '',
      megaModel: '',
      megaErr: false,
      backgroundColor: 'primary',
    };
  },
  watch: {
    $route(to) {
      this.setBackground(to.query.background);
    },
  },
  mounted() {
    this.validate();
    this.setBackground(this.$route.query.background);
  },
  methods: {
    validate() {
      this.helperValidationError = this.helperValidationModel.length > 4;
    },
    onMasterInput(value, e) {
      console.log('On Master Input value = ', this.masterModel, ' e = ', e); // eslint-disable-line
      this.defaultModel = this.masterModel;
      this.requiredModel = this.masterModel;
      this.optionalModel = this.masterModel;
      this.hiddenModel = this.masterModel;
      this.disabledModel = this.masterModel;
      this.formWithButtons = this.masterModel;
      this.requiredWithIcons = this.masterModel;
      this.helperValidationModel = this.masterModel;
      this.multiRowModel = this.masterModel;
      this.sizeModel = this.masterModel;
      this.megaModel = this.masterModel;
      this.dateModel = this.masterModel;
      this.dateTimeModel = this.masterModel;
    },
    setBackground(background) {
      switch (background) {
        case 'primary':
          this.backgroundColor = 'primary';
          break;
        case 'secondary':
          this.backgroundColor = 'secondary';
          break;
        default:
          this.backgroundColor = 'primary';
      }
    },
  },
};
</script>
<style>
  .demo-input {
    margin: 10px;
    /*line-height: 1;*/
  }
</style>
