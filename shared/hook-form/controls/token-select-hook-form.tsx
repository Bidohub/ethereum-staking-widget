import { useController, useFormState, useFormContext } from 'react-hook-form';

import {
  SelectIcon,
  Option,
  Eth,
  Steth,
  Wsteth,
  OptionValue,
} from '@lidofinance/lido-ui';

import { getTokenDisplayName } from 'utils/getTokenDisplayName';
import { isValidationErrorTypeValidate } from 'shared/hook-form/validation/validation-error';
import { TOKENS as TOKENS_SDK } from '@lido-sdk/constants';

export const TOKENS = {
  BTC: 'BTC',
  [TOKENS_SDK.STBTC]: TOKENS_SDK.STBTC,
  [TOKENS_SDK.WSTBTC]: TOKENS_SDK.WSTBTC,
} as const;
export type TOKENS = keyof typeof TOKENS;

export type TokenOption = {
  label?: string;
  token: TOKENS;
};

const iconsMap = {
  [TOKENS.BTC]: <Eth />,
  [TOKENS.STBTC]: <Steth />,
  [TOKENS.WSTBTC]: <Wsteth />,
} as const;

type TokenSelectHookFormProps = {
  options: TokenOption[];
  fieldName?: string;
  resetField?: string;
  errorField?: string;
  onChange?: (value: TOKENS) => void;
};

export const TokenSelectHookForm = ({
  options,
  fieldName = 'token',
  resetField = 'amount',
  errorField = 'amount',
  onChange,
}: TokenSelectHookFormProps) => {
  const { field } = useController<Record<string, TOKENS>>({ name: fieldName });
  const { setValue, clearErrors } = useFormContext();

  const { errors, defaultValues } = useFormState<Record<string, unknown>>({
    name: errorField,
  });

  return (
    <SelectIcon
      {...field}
      icon={iconsMap[field.value]}
      data-testid="drop-down"
      error={isValidationErrorTypeValidate(errors[errorField]?.type)}
      onChange={(value: OptionValue) => {
        setValue(fieldName, value, {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        });
        setValue(resetField, defaultValues?.[resetField], {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        });
        clearErrors(resetField);
        onChange?.(value as TOKENS);
      }}
    >
      {options.map(({ label, token }) => (
        <Option
          key={token}
          leftDecorator={iconsMap[token]}
          value={token}
          data-testid={token}
        >
          {label || getTokenDisplayName(token)}
        </Option>
      ))}
    </SelectIcon>
  );
};
