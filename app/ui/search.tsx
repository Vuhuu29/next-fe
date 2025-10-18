'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname() // đường dẫn hiện tại
  const {replace} = useRouter() //hàm thay thế đường dẫn hiện tại

  // hàm chỉ chạy sau khi người dùng sau khi người dùng đã ngừng nhập 300ms
  const handleSearch = useDebouncedCallback((tearm: string) => {
    const params = new URLSearchParams(searchParams); // tiện ích để thao tác các tham số truy vấn url
    params.set('page', '1');
    if (tearm) {
      params.set('query', tearm)
    } else {
      params.delete('query')
    }
    // khi người dùng nhập từ khóa tìm kiếm thì url cũng thay đổi theo
    replace(`${pathname}?${params.toString()}`)
  }, 300)
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder} onChange={(e) => {
          handleSearch(e.target.value)
        }}
        // khi người dùng truy cập tìm kiếm bằng url thì nó cũng hiện ở ô tìm kiếm theo
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
