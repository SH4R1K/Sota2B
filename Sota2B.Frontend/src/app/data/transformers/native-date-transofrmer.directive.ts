import {Directive, Injectable} from '@angular/core';
import {TuiDay, TuiValueTransformer} from '@taiga-ui/cdk';
import {TUI_DATE_VALUE_TRANSFORMER} from '@taiga-ui/kit';

type From = TuiDay | null;

type To = Date | null;

@Injectable()
class NativeDateTransformer extends TuiValueTransformer<From, To> {
    public fromControlValue(controlValue: To): From {
        if (controlValue instanceof Date) {
            return TuiDay.fromLocalNativeDate(controlValue);
        } else if (typeof controlValue === 'string') {
            const date = new Date(controlValue);
            if (!isNaN(date.getTime())) { // Проверка на валидность даты
                return TuiDay.fromLocalNativeDate(date);
            }
        }
        return null; // Возвращаем null, если значение не валидно
    }

    public toControlValue(componentValue: From): To {
        return componentValue?.toLocalNativeDate() || null;
    }
}

@Directive({
    standalone: true,
    selector: 'tui-input-date[toNativeDate]',
    providers: [
        {
            provide: TUI_DATE_VALUE_TRANSFORMER,
            useClass: NativeDateTransformer,
        },
    ],
})
export class ENativeDateTransformer {}
