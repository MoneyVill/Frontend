import { navTo } from "@/store/store"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

function useNavigate() {
    const router = useRouter()
    const [navToAtom, setNavToAtom] = useAtom(navTo)

    function navigate(url: string, transition = "rightToLeft") {
        // 현재 상태 저장
        sessionStorage.setItem(
            `__next_scroll_${window.history.state?.key || ''}`,
            JSON.stringify({
                x: window.pageXOffset,
                y: window.pageYOffset,
            }),
        )

        // navTo 상태 업데이트
        setNavToAtom({ url, transition })
        
        // 직접 라우팅 추가
        router.push(url)
    }

    return navigate
}

export default useNavigate