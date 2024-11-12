import { navTo } from "@/store/store"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

function useNavigate() {
	const router = useRouter()
	const [navToAtom, setNavToAtom] = useAtom(navTo)

	function navigate(url: string, transition = "rightToLeft") {
		if (router.pathname !== url && navToAtom.url === "") {
			sessionStorage.setItem(
				`__next_scroll_${window.history.state.key}`,
				JSON.stringify({
					x: window.pageXOffset,
					y: window.pageYOffset,
				}),
			)

			setNavToAtom(() => {
				return { url, transition }
			})
		}
	}

	return navigate
}

export default useNavigate
