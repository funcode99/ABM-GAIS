<script setup>
  import StepProgress from "../../components/StepProgress.vue";
</script>
<!-- collect name, email, and company info -->
<!-- Get talk title, brief, and track -->
<!-- Ask the user to share how they heard about us -->

<template>
    <!-- <section>  
      <FormKit type="form">
        <FormKit type="multi-step">

          <FormKit type="step" name="contactInformation">
          <FormKit 
            type="text" 
            label="Your Name" 
            validation="required"
          />
          <FormKit 
            type="email" 
            label="Your Email" 
            validation="required|email" 
          />
          <FormKit 
            type="text" 
            label="Your Company (optional)"
            help="Are speaking on behalf of an organization?"
          />
          </FormKit>

          <FormKit type="step" name="talkDetails">
          <FormKit 
            type="text" 
            label="Talk Title" 
            validation="required"
          />
          <FormKit 
            type="textarea" 
            label="Talk Brief" 
            validation="required|length:100"
            help="What is your talk about?"
          />
          <FormKit 
            type="radio" 
            label="Talk Track"
            help="Which track are you submitting for?"
            :options="['Development', 'Testing', 'Leadership']"
          />
          </FormKit>

          <FormKit type="step" name="referral">
          <h2>Thank you for taking the time to submit your talk</h2>
          <p>If you don't mind we'd love to know how you heard about VueUniverse.</p>
          <FormKit 
            type="radio" 
            label="How did you hear about VueUniverse?" 
            :options="['Online Ad', 'Friend or Coworker', 'Search Results', 'Other']"
          />
          </FormKit>

          <FormKit type="step" name="contactInformation">
          <FormKit 
            type="text" 
            label="Your Name" 
            validation="required"
          />
          <FormKit 
            type="email" 
            label="Your Email" 
            validation="required|email" 
          />
          <FormKit 
            type="text" 
            label="Your Company (optional)"
            help="Are speaking on behalf of an organization?"
          />
          </FormKit>

          <FormKit type="step" name="talkDetails">
          <FormKit 
            type="text" 
            label="Talk Title" 
            validation="required"
          />
          <FormKit 
            type="textarea" 
            label="Talk Brief" 
            validation="required|length:100"
            help="What is your talk about?"
          />
          <FormKit 
            type="radio" 
            label="Talk Track"
            help="Which track are you submitting for?"
            :options="['Development', 'Testing', 'Leadership']"
          />
          </FormKit>

          <FormKit type="step" name="referral">
          <h2>Thank you for taking the time to submit your talk</h2>
          <p>If you don't mind we'd love to know how you heard about VueUniverse.</p>
          <FormKit 
            type="radio" 
            label="How did you hear about VueUniverse?" 
            :options="['Online Ad', 'Friend or Coworker', 'Search Results', 'Other']"
          />
          </FormKit>

        </FormKit>
      </FormKit>
    </section> -->

    <section>
      <StepProgress/>
    </section>
    
</template>