import { navTo } from "@/store/store"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

function useNavigate() {
    const router = useRouter()
    const [, setNavToAtom] = useAtom(navTo) // navToAtom 제거

    function navigate(url: string, transition = "rightToLeft") {
        sessionStorage.setItem(
            `__next_scroll_${window.history.state?.key || ''}`,
            JSON.stringify({
                x: window.pageXOffset,
                y: window.pageYOffset,
            }),
        )

        setNavToAtom({ url, transition }) // 상태 업데이트

        router.push(url) // 라우팅
    }

    return navigate
}

export default useNavigate
