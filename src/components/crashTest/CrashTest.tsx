import styles from './CrashTest.module.scss';
import { ReactCssTree } from '../ReactCssTree/ReactCssTree';
import { useQuery } from '@tanstack/react-query';
import { fetchService } from '@service/fetchService';

export function CrashTest() {
    const { getQueryAny } = fetchService();
    const { data } = useQuery({
        queryKey: ['meteo'],
        queryFn: () => {
            return getQueryAny(
                'https://api.open-meteo.com/v1/forecast?latitude=48.78&longitude=2.31&hourly=temperature_2m,precipitation,wind_speed_10m&models=meteofrance_seamless&timezone=Europe%2FLondon',
            );
        },
    });

    console.log(data);
    return <ReactCssTree />;
}
