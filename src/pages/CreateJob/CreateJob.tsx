import { useForm } from 'react-hook-form';
import { Content } from 'src/components/Content';
import { FormAutocomplete } from 'src/components/FormAutocomplete';
import { FormTextField } from 'src/components/FormTextField';
import { Screen } from 'src/components/Screen';

const CreateJob = () => {
  // - HOOKS - //
  const { control } = useForm();

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //
  // address: this.job.address,
  //         communityId: this.job.community,
  //         date: this.job.date,
  //         builderId: this.job.builder,
  //         installerId: "" || this.job.installer,
  //         reporterId: this.job.reporter,
  //         sowId: this.job.scope,
  //         areaId: this.job.area,
  //         lineItems: this.job.lineItems,
  // - JSX - //
  return (
    <Screen title="Manage">
      <Content>
        <form className="form-card grid-cols-2" onSubmit={console.log}>
          <h1 className="form-title col-span-2">Create a New Job</h1>

          <FormAutocomplete
            className="col-span-2"
            control={control}
            label="Company"
            options={[]}
            name={''}
          />

          <FormAutocomplete
            className="col-span-2"
            control={control}
            label="Community"
            options={[]}
            name={''}
          />

          <FormAutocomplete
            className="col-span-2"
            control={control}
            label="Builder"
            options={[]}
            name={''}
          />

          <FormTextField
            className="col-span-2"
            control={control}
            label="Address"
            name=""
          />

          <FormAutocomplete
            className="col-span-2"
            control={control}
            label="Installer"
            options={[]}
            name={''}
          />

          <FormAutocomplete
            className="col-span-2"
            control={control}
            label="Reporter"
            options={[]}
            name={''}
          />

          <FormAutocomplete
            className="col-span-2"
            control={control}
            label="Scope"
            options={[]}
            name={''}
          />

          <FormAutocomplete
            className="col-span-2"
            control={control}
            label="Area"
            options={[]}
            name={''}
          />

          <FormTextField
            className="col-span-2"
            control={control}
            label="Line Item 1"
            name=""
          />
          <FormTextField
            className="col-span-2"
            control={control}
            label="Line Item 2"
            name=""
          />

          <FormTextField
            className="col-span-2"
            control={control}
            label="Notes"
            name=""
            multiline
          />
        </form>
      </Content>
    </Screen>
  );
};

export default CreateJob;
